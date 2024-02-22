import axios from "axios"
import { useState, useEffect } from "react";

export function Desplegable() {

    axios.defaults.withCredentials = true;

    const [logout, setLogout] = useState()
    const [loged, setLoged] = useState()

    useEffect(() => {
        const fetchLoged = async () => {
            try {
                const response = await axios.post('http://localhost:3000/permission');
                const data = response.data;
                setLoged(data);
            } catch (error) {
                console.error('Error fetching admin status:', error);

            }
        }

        fetchLoged()
    }, [])

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
        <>
            {loged
                ? <div className="d-flex">
                    <div className=" p-2 " id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown-center " data-bs-theme="dark">
                                <a className="nav-link dropdown-toggle dropdown-center text-light me-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Perfil
                                </a>
                                <ul className="dropdown-menu">
                                    
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleclick}>cerrar sesión</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div >
                : <div className="d-flex">
                <div className=" p-2 " id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown-center " data-bs-theme="dark">
                            <a className="nav-link dropdown-toggle dropdown-center text-light me-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Perfil
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/login">Inicio sesión</a></li>
                                <li><a className="dropdown-item" href="/signup">Registrarse</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#" onClick={handleclick}>cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div >
            }
        </>
    )
}