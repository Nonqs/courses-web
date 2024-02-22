import { Button, TextField } from "@mui/material";
import InputFileUpload from "./function/Upload";
import { useState } from "react"

export function Leccion({ index, leccion, onLeccionDataChange, handleLeccionFileChange }) {

    const { description, file, title } = leccion;

    const handleDescriptionChange = (e) => {
        onLeccionDataChange(index, { description: e.target.value });
    }

    const handleTitleChange = (e) => {
        onLeccionDataChange(index, { title: e.target.value });
    }

    const handleFileChange = (e) => {
        onLeccionDataChange(index, { file: e.target.files[0] });
        handleLeccionFileChange(index, { file: e.target.files[0] })
    }

    const urlFileChange = (e) => {
        onLeccionDataChange(index, { file: e.target.value });
        handleLeccionFileChange(index, { file: e.target.value })
    }

    return (
        <div className="ms-5">
            <article className="d-flex align-items-center">
                <h6 className="me-4"><strong>Leccion {index + 1}</strong></h6>
                <TextField
                    className="mt-3 mb-3"
                    id="standard-basic"
                    label="Nombre de la leccion"
                    variant="outlined"
                    onChange={handleTitleChange}
                />
            </article>
            <div className="d-flex align-items-center">
                <InputFileUpload selectedHanlder={handleFileChange} />
                <span className="ms-3 me-3">O</span>
                <TextField
                    id="standard-basic"
                    label="URL con contenido"
                    variant="standard"
                    onChange={urlFileChange}
                />
            </div>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Pequeña descripción de la leccion</label>
            <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleDescriptionChange}
            ></textarea>
            <Button className="mt-3" variant="outlined" color="error">
                Borrar leccion
            </Button>
            <hr />
        </div>
    )

}