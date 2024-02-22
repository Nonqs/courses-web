CREATE DATABASE courses;

USE courses;

-- USER TABLE

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    rol VARCHAR(20)
);

DESCRIBE users;

-- Permisos TABLE

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_course INT,
    FOREIGN KEY (id_user) REFERENCES users(id),
    last_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_course) REFERENCES course(id)
);

-- COURSES TABLE

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    file_path VARCHAR(255) DEFAULT NULL
    
);

--

CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_course INT,
    title VARCHAR(255),
    FOREIGN KEY (id_course) REFERENCES courses(id)
    
);

--

CREATE TABLE lecciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_module INT,
    title VARCHAR(255),
    description TEXT,
    file_path VARCHAR(255), -- Ruta del archivo en el servidor
    FOREIGN KEY (id_module) REFERENCES modules(id)
);

