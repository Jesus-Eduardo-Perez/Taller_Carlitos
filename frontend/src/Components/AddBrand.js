import React from "react";
import styles from "../CSS Components/AddBrand.module.css"
function AddBrand({ isOpen, onClose}) {
    if (!isOpen) return null;
    return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Agregar marca</h2>
        <form>
          <div className={styles.form_group}>
            <label>Nombre de la marca</label>
            <input
              type="text"
              required
            />
          </div>
          <button type="submit" className={styles.saveButton}>Guardar</button>
        </form>
      </div>
    </div>
    );
}
export default AddBrand;