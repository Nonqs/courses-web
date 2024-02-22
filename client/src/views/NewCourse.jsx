import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Module } from "../components/Module";
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Navigate } from "react-router-dom";

export function NewCourse() {

    axios.defaults.withCredentials = true;

    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [modules, setModules] = useState([]);
    const [leccionData, setLeccionData] = useState([])
    const [success, setSuccess] = useState(false)
    const [files, setFiles] = useState([])
 
    const handleAddModule = () => {

        setModules([...modules, <Module key={modules.length} handleLeccion={handleLeccion} index={modules.length} />]);
    };


    const handleLeccion = (lecciones, index, moduleName, file) => {

        const moduleS = "Module " + (index + 1) + ": " + moduleName

        setLeccionData(prevLeccionData => ({
            ...prevLeccionData,
            [moduleS]: lecciones
        }));
        setFiles(file)
    };



    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(leccionData)
        console.log(files)

        try {

            const response = await axios.post("http://localhost:3000/add", {

                courseName,
                courseDescription,
                leccionData,
                files

            })

            setSuccess(true)

        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <>

            <form action="">
                <div className="container mt-4">
                    <Paper elevation={3} className="p-5">
                        <div className="container">
                            <h2 className="mb-2 mt-2">Nuevo curso</h2>
                            <TextField
                                className="mt-3 mb-3"
                                id="standard-basic"
                                label="Nombre del curso"
                                variant="outlined"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Pequeña descripción del curso</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="container">
                            {modules.map((module, index) => (
                                <div key={index}>
                                    {module}
                                </div>
                            ))}
                            <Button variant="contained" className="mt-5 mb-5" onClick={handleAddModule}>+ Nuevo módulo</Button>
                        </div>

                    </Paper>
                    <div className="container">
                        <Button className="mb-5 mt-5" variant="contained" color="success" onClick={handleSubmit}>
                            Guardar curso
                        </Button>
                    </div>
                </div>
            </form>

            {success &&
                <Navigate to="/admin" />
            }

        </>
    )
}