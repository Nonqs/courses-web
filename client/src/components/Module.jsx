import { Button, TextField } from "@mui/material";
import { Leccion } from "./Leccion";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export function Module({ index, handleLeccion }) {

    const [lecciones, setLecciones] = useState([]);
    const [moduleName, setModuleName] = useState()
    const [file, setFile] = useState([])

    const handleAddLeccion = () => {
        const newLeccion = {
            title: '',
            description: '',
            file: null
        };

        console.log(newLeccion)

        setFile([...file, null]);
        setLecciones([...lecciones, newLeccion]);
    };

    const handleLeccionDataChange = (index, data) => {
        const updatedLecciones = [...lecciones];
        updatedLecciones[index] = { ...updatedLecciones[index], ...data };
     
        setLecciones(updatedLecciones);
    }

    useEffect(() => {
        

        if (lecciones !== null && lecciones.length > 0) {

            handleLeccion(lecciones, index, moduleName, file); // Pasar lecciones después de que se actualice el estado

        }
       
    }, [lecciones]); // useEffect se ejecutará cada vez que lecciones cambie


    
    const handleLeccionFileChange = (index, newFile) => {
        const updatedFiles = [...file]; 
    
        updatedFiles[index] = newFile; 
    
        setFile(updatedFiles); 
    }



    return (
        <>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <article  className="d-flex align-items-center">
                    <h4 className="me-4">Modulo {index + 1}</h4>
                    <TextField
                        className="mt-3 mb-3"
                        id="standard-basic"
                        label="Nombre del modulo"
                        variant="outlined"
                        onChange={(e) => setModuleName(e.target.value)}
                    />
                    </article>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <hr />
                {lecciones.map((leccion, index) => (
                    <Leccion key={index} index={index} leccion={leccion} onLeccionDataChange={handleLeccionDataChange} handleLeccionFileChange={handleLeccionFileChange} />
                ))}
                <Button variant="outlined" onClick={handleAddLeccion} className="ms-5 mt-3 mb-3">+ Nueva lección</Button>
            </div>
        </>
    );
}