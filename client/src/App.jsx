import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AdMain } from './views/HomeAd';
import { HomeClient } from './views/HomeClient';
import { Signup } from './views/Signup';
import { Login } from './views/Login';
import { NewCourse } from './views/NewCourse';
import { CoursesPage } from './views/CoursePage';
import axios from 'axios';
import { Home } from './views/Home';
import { RedirectProvider } from './context/Redirect';


function App() {

  return (
    <BrowserRouter>
      <RedirectProvider >
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdMain />} />
            <Route path="/yourcourses" element={<HomeClient />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newcourse" element={<NewCourse />} />
            <Route path="/course" element={<CoursesPage />} />
          </Route>
        </Routes>
      </RedirectProvider>
    </BrowserRouter>
  );
}

export default App;