import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function CoursesClients({getCourses}) {

  axios.defaults.withCredentials = true;


  const [enter, setEnter] = useState(null)
  const [deleteCourse, setdeleteCourse] = useState(null)
  const [courses, setCourses] = useState([]);
  const [userPermissions, setUserPermissions] = useState([])

  useEffect(() => {

    getCourses().then((data) => {setCourses(data), setUserPermissions(data.coursesId)})

  }, [getCourses])

  const hasPermission = (courseId) => {
    console.log(courseId)
    console.log(userPermissions)
    return userPermissions.includes(courseId);
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
        courses.courses.map((course) => (
          <div key={course.id} className="card w-100 m-5">
            <div className="card-header">{course.title}</div>
            <div className="card-body">
              <p className="card-text">
                {course.description}
              </p>
              <article>
                {hasPermission(course.id)
                ?(<div>
                  <Button variant="outlined" className="me-3" onClick={() => setEnter(course)}>Entrar al curso</Button>
                 
                </ div>)
                : (<div>
                <Button variant="outlined" className="me-3" onClick={() => setEnter(course)} disabled>Entrar al curso</Button>
                <Button variant="outlined" className="me-3" color="secondary">Adquirir el curso</Button>
              </ div>)
}
              </article>
            </div>
          </div>
        ))
      )}

      {enter && <Navigate to="/course" state={{ course: enter }} />}
    </div>
  )
}
