import React, {useState} from "react";
import styles from '../CSS Components/AddBrand.module.css';

function EditBrandModal({isOpen, onClose, brand, onUpdate}) {
    const [formData, setFormData] = useState({...brand});

    const handleChange = (e) => {
    const { name, type, files, value } = e.target;
     setFormData({
     ...formData,
     [name]: type === 'file' ? files[0] : value
     });
    };


    const handleUpdate = () => {
        onUpdate(brand.id, formData);
        onClose();
    }
    if(!isOpen) return null;
    return(
        <div className = {styles.overlay}>
            <div className= {styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Editar Marca {brand.name}</h2>
                    <div className={styles.form_group}>
                        <label>Cambiar Imagen</label>
                        <img src={`http://localhost:3000${brand.image_url}`} alt={brand.name} width="150" height="150"/>
                        <input name="image" type="file" accept="image/*" onChange={handleChange} required />
                        <label>Nombre de la marca</label>
                        <input name = "name" type="text" placeholder="Nombre de la marca" value={formData.name} onChange={handleChange} required/>
                    </div>
                     <button className={styles.saveButton} onClick={handleUpdate}>Guardar</button>
            </div>
        </div>
    );
}

export default EditBrandModal;