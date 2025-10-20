import React, {useState} from "react";
import axios from 'axios';
import styles from "../CSS Components/AddBrand.module.css";

const API_URL = 'http://localhost:3000/api/brands';
function AddBrand({ isOpen, onClose}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Marca agregada correctamente');
    };
    if (!isOpen) return null;
    return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Agregar marca</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label>Cargar Imagen</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
            <label>Nombre de la marca</label>
            <input type="text" placeholder="Nombre de la marca" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <button type="submit" className={styles.saveButton}>Guardar</button>
        </form>
      </div>
    </div>
    );
}
export default AddBrand;