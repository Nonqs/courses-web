import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import "../styles/Form.css"

export function Signup() {

  axios.defaults.withCredentials = true;

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirm, setConfirm] = useState()
  const [err, setErr] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post("http://localhost:3000/signup", {

        name,
        email,
        password,
        confirm,

      })

      setSuccess(true)

    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        setErr(error.response.data)
      }

    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="text-center form-container">
          <form className="form" style={{minWidth: "400px"}}>
            <div className="d-flex flex-column bg-body-tertiary p-5 rounded-4 mb-5 shadow-sm">
              <h2>Registrarse</h2>

              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Email"
                onChange={(e) => { setEmail(e.target.value) }}
              />

              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Nombre"
                onChange={(e) => { setName(e.target.value) }}
              />

              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Contraseña"
                onChange={(e) => { setPassword(e.target.value); setErr() }}
              />

              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Confirma tu contraseña"
                onChange={(e) => { setConfirm(e.target.value); setErr() }}
              />
              <MuiLink className="m-2" component={Link} to="/login">
                ¿Tienes una cuenta? <br /> Inicia sesión
              </MuiLink>
              <Button onClick={handleSubmit} variant="contained">Registrarse</Button>

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
        <Navigate to="/library" />
      }
    </>
  )
}
