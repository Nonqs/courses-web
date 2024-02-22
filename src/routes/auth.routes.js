const express = require("express")
const { register, login } = require("../controllers/auth")
const { isLogedIn, isNotLogedIn } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/signup", register)

router.post("/login", login)

router.post('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).send('Error al cerrar sesión');
        }
        
        res.send(true) 
    });
});

router.post("/permission", isLogedIn, async (req, res) => {

    console.log("hola")
    try {
        const { rol } = req.session.user;
        console.log("Rol:", rol);
        // Verificamos si el rol es 'admin' y enviamos true si lo es, false si no lo es
        const isAdmin = rol === 'admin';
        console.log("hola", isAdmin)
        res.send( isAdmin );
    } catch (error) {
        console.error("Error al verificar permisos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/permission", isLogedIn, async (req, res) => {

    if(req.session.user){

        res.send(true)

    } else{

        res.send(false)

    }

});

module.exports = router 