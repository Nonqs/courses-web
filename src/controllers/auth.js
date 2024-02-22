const pool = require("../db")
const helpers = require("../lib/helpers")

const register = async (req, res) =>{

    if(req.body.password !== req.body.confirm){

        return res.status(400).send("Las contraseñas no coinciden");

    }

    const { email, name, password } = req.body

    const consult = "SELECT * FROM users WHERE email = ?"

    const rows = await pool.query(consult, [email])

    if(rows.length > 1 ){
        return res.status(400).json({
            message: ["The email is already in use"],
        })
    }

    const newUser = {
        name,
        email,
        password,
        rol : "client"
    }

    newUser.password = await  helpers.encryptPassword(password)

    console.log(newUser)

    const result = await pool.query("INSERT INTO users SET ?", [newUser])
    newUser.id = result.insertId

    const rowsNewUser = await pool.query(consult, [email])
    const authenticatedUser = rowsNewUser[0]


    req.session.user = authenticatedUser;

    console.log("user:", req.session.user);

    res.send(authenticatedUser);

}

const login = async(req, res) =>{

    const { email, password } = req.body

    const consult = "SELECT * FROM users WHERE email = ?"

    console.log(email)

    const rows = await pool.query(consult, [email])
    const authenticatedUser = rows[0]

    console.log(authenticatedUser)

    const validPassword = await helpers.matchPassword(password, authenticatedUser.password)

    if(validPassword){

        console.log("s")

        req.session.user = authenticatedUser;
        console.log("session: ", req.session.user);

        if(authenticatedUser.rol === "client"){
            authenticatedUser.rol = "yourcourses"
        }

        res.send(authenticatedUser);

    }

}


module.exports = {
    register,
    login
}