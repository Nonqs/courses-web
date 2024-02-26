import { Button, Paper } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "../styles/button.css";
import { TabNav } from "../components/TabNav";

export function Home() {

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center align-items-center position-relative mt-4" style={{ minHeight: "75vh" }}>
                <div className="position-absolute top-0 start-50 translate-middle-x">
                    <Paper elevation={24} className=" bg-dark d-flex flex-column justify-content-center align-items-center p-4" style={{ width: "100%" }}>
                        <div className="container p-5">
                            <div className="text-center mb-4">
                                <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", color: "white" }}>
                                    <span style={{ color: "#00FFFF", fontWeight: "initial" }}>CREA TU EMPRENDIMIENTO</span>
                                    <br />
                                    <strong>MEJORA EL QUE TIENES</strong>
                                </h2>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                                <button className="m-2 w-50 w-md-50 button">Inicia ahora</button>
                               <button size="large" className="m-2 w-50 w-md-50 button">Nuestros cursos</button>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
            <div className="bg-dark d-flex  justify-content-center align-items-center"  style={{ minHeight: "50vh" }}>
                <TabNav id="courses" />
            </div>
        </div>
    );
}