import { Button, Paper } from "@mui/material";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="gradient-bg d-flex justify-content-center align-items-center">
            <div className="d-flex w-100">
                <div className="w-50 d-flex justify-content-center m-5">
                    <Paper elevation={3} className="p-5 w-75 bg-body-tertiary">
                        <h2>¡Conoce más acerca de nosotros!</h2>
                    </Paper>
                </div>
                <div className="w-50 d-flex justify-content-center m-5">
                    <Paper elevation={3} className="p-5 w-50 text-center bg-body-tertiary">
                        <h2>Empieza ahora!</h2>
                        <article className="d-flex flex-column m-3">
                            <Link to="/login"><Button className="m-2" variant="contained">Iniciar sesión</Button></Link>
                            <Link to="/signup"><Button className="m-2" variant="contained">Registrarse</Button></Link>
                        </article>
                    </Paper>
                </div>
            </div>
        </div>
    )
}