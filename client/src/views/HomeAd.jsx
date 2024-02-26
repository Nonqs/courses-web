import { Button } from "@mui/material";
import { Course } from "../components/Course";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function AdMain() {

  axios.defaults.withCredentials = true;

  const getCourses = async () => {
    try {
      const response = await axios.get("https://dc38-178-237-231-73.ngrok-free.app/coursesadmin", {});
      return response.data;
    } catch (error) {
      console.error("Error getting courses:", error);
      return [];
    }
  };

  const [newCourse, setNewCourse] = useState(false)

  return (
    <div className="d-flex">
      <Course getCourses={getCourses}/>
      <Button variant="contained" className="m-5" onClick={()=>{setNewCourse(!newCourse)}}>+ Nuevo Curso</Button>
      {newCourse &&
       <Navigate to="/newcourse" />
      }
    </div>
  )
}