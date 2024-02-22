import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function Course({getCourses}) {

  axios.defaults.withCredentials = true;


  const [enter, setEnter] = useState(null)
  const [deleteCourse, setdeleteCourse] = useState(null)
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, [getCourses]);

  
  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:3000/delete", { deleteCourse });
      getCourses().then((data) => setCourses(data));
      
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };




  return (
    <div className="me-5">
      {courses.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="card w-100 m-5">
            <div className="card-header">{course.title}</div>
            <div className="card-body">
              <p className="card-text">
                {course.description}
              </p>
              <article>
                <Button variant="outlined" className="me-3" onClick={() => setEnter(course)}>Entrar al curso</Button>
                <Button variant="outlined" color="secondary" className="me-3">Editar el curso</Button>
                <Button variant="outlined" color="error" className="me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setdeleteCourse(course)}}>Eliminar el curso</Button>
              </article>
            </div>
          </div>
        ))
      )}

      {enter && <Navigate to="/course" state={{ course: enter }} />}


      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"><strong style={{ color: "red" }}>Eliminar Curso</strong></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-5">
              ¿Estás seguro de que quieres eliminar el curso? Esta acción no puede revertirse.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
