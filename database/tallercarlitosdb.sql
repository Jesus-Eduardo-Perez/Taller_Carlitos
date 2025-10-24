/*Base de datos de Taller Carlitos*/
CREATE DATABASE IF NOT EXISTS tallercarlitosdb;
USE tallercarlitosdb;

--Tabla de usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_type TINYINT(4) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--Tabla de marcas (brands)
CREATE TABLE brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
