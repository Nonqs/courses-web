import { Button } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { CoursesClients } from "../components/CoursesClients";

export function HomeClient() {

  axios.defaults.withCredentials = true;

  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses", {});
      return response.data;
    } catch (error) {
      console.error("Error getting courses:", error);
      return [];
    }
  };

  const [newCourse, setNewCourse] = useState(false)

  return (
    <div className="d-flex">
      <CoursesClients getCourses={getCourses}/>
       
    </div>
  )
}