import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import "../styles/Form.css"
import { useRedirect } from "../context/Redirect";

export function Login() {

    axios.defaults.withCredentials = true;

    const { redirectPath, setRedirect } = useRedirect();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState()
    const [success, setSuccess] = useState()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://dc38-178-237-231-73.ngrok-free.app/login", {
                email,
                password,
            });
            setSuccess(true);
            setRedirect(response.data.rol); // Establece la ruta de redirección en función de la respuesta del servidor
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response) {
                setErr(error.response.data);
            }
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="text-center form-container" >
                    <form className="form">
                        <div className="d-flex flex-column bg-body-tertiary p-5 rounded-4 mb-5 shadow-sm">
                            <h2>Iniciar sesión</h2>

                            <TextField
                                required
                                margin="normal"
                                id="outlined-required"
                                label="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <TextField
                                id="outlined-password-input"
                                label="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e)=>{ setPassword(e.target.value)}}
                            />

                            <MuiLink className="m-2" component={Link} to="/signup">
                                ¿No tienes una cuenta? <br /> Regístrate
                            </MuiLink>
                            <Button onClick={handleSubmit} variant="contained">Iniciar sesión</Button>

                            {err &&
                                <div className="alert alert-danger w-100 mt-4" role="alert">
                                    {err}
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
            {success &&
                <Navigate to={"/"+redirectPath} />
            }
        </>
    )
}
