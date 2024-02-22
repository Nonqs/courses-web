const pool = require("../db")

const hasPermission = async (req, res, next) => {

    console.log(req.session.user.id)

    const permission = await pool.query("SELECT id_course FROM permissions WHERE id_user = ?", [req.session.user.id])

    const courseIds = permission.map(row => row.id_course);

    req.userCourseIds = courseIds;

    next()
}

const admin = async (req, res, next) => {

    if(req.session.user.rol === "admin"){
        next()
    }

}


module.exports = {
    hasPermission,
    admin
}