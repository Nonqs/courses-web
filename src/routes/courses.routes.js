const express = require("express")
const pool = require("../db")
const { compare } = require("bcryptjs")
const fs = require('fs');
const multer = require("multer")
const path = require("path")
const { isLogedIn, isNotLogedIn } = require("../middlewares/auth.middleware")
const { hasPermission, admin } = require("../middlewares/permission")

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post("/add", isLogedIn, admin, upload.single("files"), async (req, res) => {

    const { courseName, courseDescription, leccionData } = req.body

    console.log(leccionData)

    // const { files } = req.file

    // console.log(files)


    // Add new course to Mysql table

    console.log(leccionData)

    const course = {
        title: courseName,
        description: courseDescription
    }

    await pool.query("INSERT INTO courses SET ?", [course])

    // Ask mySql the id of the course and add to the module 

    const idCourse = await pool.query("SELECT id FROM courses WHERE title = ?", [courseName])

    const idDelCurso = idCourse[0].id;

    const moduleKeys = Object.keys(leccionData);

    // Iterar sobre las claves y acceder a los módulos

    moduleKeys.forEach(async (key) => {

        const moduleData = leccionData[key];

        console.log(key)

        console.log(leccionData[key])

        // solicitar el id del curso a la base de datos

        const newModule = {
            title: key,
            id_course: idDelCurso
        }
        await pool.query("INSERT INTO modules SET ?", [newModule])

        const idModule = await pool.query("SELECT id FROM modules WHERE title = ?", [key])

        const idOfModule = idModule[0].id

        for (let i = 0; i < moduleData.length; i++) {


            const newLeccion = {
                id_module: idOfModule,
                title: moduleData[i].title,
                description: moduleData[i].description,
                file_path: moduleData[i].file
            }

            await pool.query("INSERT INTO lecciones SET ?", [newLeccion])

        }

    })

    res.send(true)


})

router.get("/courses", isLogedIn, hasPermission, async (req, res) => {

    const courses = await pool.query("SELECT * FROM courses")

    let coursesId = req.userCourseIds

    console.log("coursesId",coursesId)

    let course = {
        courses,
        coursesId
    }

    res.send(course)

})

router.get("/coursesadmin",isLogedIn, admin, async (req, res) => {

    const courses = await pool.query("SELECT * FROM courses")

    res.send(courses)

})

router.post("/courses", async (req, res) => {

    const { course } = req.body

    const modules = await pool.query("SELECT * FROM modules WHERE id_course = ?", [course.id])

    let lecciones = []

    for (let module of modules) {

        const newLecciones = await pool.query("SELECT * FROM lecciones WHERE id_module = ?", [module.id])

        lecciones.push(newLecciones)

    }

    lecciones = lecciones.flat()

    console.log("Lecciones: ", lecciones[0].file_path)

    let video = true

    if (lecciones[0].file_path) {



        if (lecciones.length > 0 && lecciones[0].file_path.includes('youtube')) {
            console.log('La dirección contiene la palabra "youtube"');
        } else {
            console.log('La dirección no contiene la palabra "youtube"');
            video = false
        }

    }

    const data = {
        modules,
        lecciones,
        video
    }

    res.send(data)
 
})

router.post("/delete", isLogedIn, admin, async (req, res) => {

    const { deleteCourse } = req.body

    const modules = await pool.query("SELECT * FROM modules WHERE id_course = ?", [
        deleteCourse.id
    ]);

    // Iterar sobre los módulos del curso
    for (let module of modules) {
        // Eliminar las lecciones asociadas a cada módulo
        await pool.query("DELETE FROM lecciones WHERE id_module = ?", [module.id]);
    }

    // Eliminar los módulos del curso
    await pool.query("DELETE FROM modules WHERE id_course = ?", [deleteCourse.id]);

    // Eliminar el curso
    await pool.query("DELETE FROM courses WHERE id = ?", [deleteCourse.id]);

    res.send(true)


})

module.exports = router