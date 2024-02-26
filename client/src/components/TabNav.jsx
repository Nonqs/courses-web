import { useEffect, useState } from "react";
import axios from "axios";

export function TabNav() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/presentation");
                setCourses(response.data);
            } catch (error) {
                console.error("Error getting courses:", error);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div className="container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {courses && courses.map((course) => (
                    <li key={course.id} className="nav-item" role="presentation">
                        <button 
                            className="nav-link active bg-light" 
                            id="home-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target={`#${course.name}`}  // Ajuste aquí
                            type="button" 
                            role="tab" 
                            aria-controls="home-tab-pane" 
                            aria-selected="true"
                        >
                            {course.title}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="tab-content bg-light" id="myTabContent">
                {courses && courses.map((course) => (
                    <div key={course.id} className="tab-pane fade" id={course.name} role="tabpanel" aria-labelledby={course.name} tabIndex="0">
                        {course.description}
                    </div>
                ))}        
            </div>
        </div>
    )
}
