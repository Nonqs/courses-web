const { sessionStore } = require('../index');
const pool = require("../db")

module.exports = {

    isLogedIn(req, res, next) {
        // Verifica si hay un ID de sesión en la cookie de la solicitud
        if (req.sessionID) {

            console.log(req.session)

            console.log(req.sessionID)
            console.log(req.session.cookie)
            console.log(req.session)
            // Realiza una consulta a la base de datos para verificar si la sesión existe
            sessionStore.get(req.sessionID, function(error, session) {
                if (error) {
                    console.error('Error al obtener la sesión de la base de datos:', error);
                    res.status(500).json({ error: 'Error del servidor' });
                    return;
                }

                console.log("ssssss", session)

    
                // Verifica si la sesión existe y si el usuario está autenticado
                if (session && session.user) {
                    // El usuario está autenticado, continúa con la solicitud
                    next();
                } else {
                    // El usuario no está autenticado, envía un error 401
                    console.log("ss");
                    res.status(401).json({ error: 'No estás autenticado' });
                }
            });
        } else {
            // No se encontró un ID de sesión en la cookie de la solicitud
            res.status(401).json({ error: 'No estás autenticado' });
        }
    },
         

    isNotLogedIn(req, res, next){

        if(!req.session.user){
            return next()
        }

        return 

    }
    
}