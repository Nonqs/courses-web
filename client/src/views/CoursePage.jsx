import AccordionExpandIcon from "../components/Acordeon";
import '../styles/CoursesPage.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


export function CoursesPage() {

  const location = useLocation();
  const { course } = location.state;

  const [modules, setModules] = useState()
  const [lecciones, setLecciones] = useState()
  const [video, setVideo] = useState()
  const [leccionView, setLeccionView] = useState({})
  const [index, setIndex] = useState(0)


  useEffect(() => {


    const getCourses = async () => {

      try {

        const response = await axios.post("http://localhost:3000/courses", {
          course
        })

        const data = response.data
        setModules(data.modules)
        setLecciones(data.lecciones)
        setVideo(data.video)
        if (data.lecciones.length > 0) {
          const primeraLeccion = data.lecciones.find(
            (leccion) => leccion.id_module === data.modules[0].id
          )
          setLeccionView(primeraLeccion);
        }
        

      } catch (error) {
        console.error("Error signing up:", error);
        if (error.response) {
          console.log(error.response.data)
        }

      }
    }

    getCourses()

  }, [])

  useEffect(() => {

    console.log(lecciones)


  }, [lecciones])


  const handleLeccion = (leccionSeleccionada, indexLeccion) =>{

    setLeccionView(leccionSeleccionada)
    setIndex(indexLeccion)
    console.log(leccionView)

  }

  return (
    <div className="courses-page">
      <div className="accordion-container">
        <AccordionExpandIcon handleLeccion={handleLeccion} course={course} modules={modules} lecciones={lecciones} className="accordion" />
      </div>
      <div className="content-container">
        {leccionView &&  ( // Verificar que lecciones y lecciones[leccionView] no sean null/undefined
          <div>
            <h2 className="text-center m-4">Leccion {index + 1} : {leccionView.title}</h2>
            <article className="container text-center">
              {video ? (
                <iframe
                  width="560"
                  height="315"
                  src={leccionView.file_path} // Usar lecciones[leccionView] en lugar de lecciones
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  className="mt-5 mb-5"
                  src={`https://drive.google.com/file/d/${leccionView.file_path}/preview`} // Usar lecciones[leccionView] en lugar de lecciones
                  width="100%"
                  height="800px"
                ></iframe>
              )}
            </article>
            <p className="m-4">{leccionView.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}