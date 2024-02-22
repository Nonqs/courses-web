import { Outlet, Link, Navigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react";
import { Button } from "@mui/material";
import { useRedirect } from "../context/Redirect";


export function Navbar() {

    const { redirectPath } = useRedirect();

    const [logout, setLogout] = useState()

    axios.defaults.withCredentials = true;

    const handleclick = async () => {
        try {

            const response = await axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true,

            })
            setLogout(true)
        } catch (e) {
            console.error("Error logout:", e);
        }
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark p-2">
                <div className="container-fluid d-flex ">

                    <Link className="navbar-brand p-2 text-light" to="/"><h1><span style={{ color: '#00FFFF' }}>Orbi</span>tronik</h1></Link>
                    <div className="d-flex">
                        <div className=" p-2 " id="navbarSupportedContent">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown-center " data-bs-theme="dark">
                                    {redirectPath === null
                                        ? <Link Link className="nav-link dropdown-center text-light me-5" to={"/login"}>
                                            Cursos
                                        </Link>
                                        : <Link Link className="nav-link dropdown-center text-light me-5" to={"/" + redirectPath}>
                                            Cursos
                                        </Link>
                                    }
                                </li>
                                <li className="nav-item dropdown-center " data-bs-theme="dark">
                                    <a className="nav-link dropdown-toggle dropdown-center text-light me-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Perfil
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/login">Perfil</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="/login" onClick={handleclick}>cerrar sesión</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >

            <Outlet />
        </div >
    )
}