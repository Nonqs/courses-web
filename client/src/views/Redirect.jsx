import { Link, Navigate } from "react-router-dom"
import { useState, useEffect} from "react"
import axios from "axios"

export function Redirect() {

    axios.defaults.withCredentials = true;

    const [isAdmin, setIsAdmin] = useState(false); // Valor predeterminado: false
    const [isLoading, setIsLoading] = useState(true); // Estado de carga inicial

    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                const response = await axios.post('http://localhost:3000/permission');
                const data = response.data;
                setIsAdmin(data);
            } catch (error) {
                console.error('Error fetching admin status:', error);
            } finally {
                setIsLoading(false); // Establecer estado de carga como falso cuando termine la solicitud
            }
        };

        fetchAdminStatus();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // Otra opción es mostrar un spinner de carga
    }

    return (
        <>
            {isAdmin ? <Navigate to="/admin" /> : <Navigate to="/yourcourses" />}
        </>
    );
}