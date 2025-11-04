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
--Tabla de piezas
CREATE TABLE parts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  brand_id INT NOT NULL,
  model VARCHAR(100),
  car_make VARCHAR(100),
  car_model VARCHAR(100),
  year_range VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 1,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id)
    REFERENCES brands(id)
    ON DELETE CASCADE
);
