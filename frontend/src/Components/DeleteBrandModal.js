import React from "react";
import styles from "../CSS Components/AddBrand.module.css";
function DeleteBrandModal({brand, onCancel, onConfirm}) {
    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onCancel}>×</button>
                <h2>Eliminar Proyecto</h2>
                <label>¿Estás seguro de eliminar la marca: <strong>{brand.name}</strong>?</label>
                <div className={styles.buttons}>
                  <button className={styles.deleteButton} onClick={onConfirm}>Eliminar</button>
                  <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
export default DeleteBrandModal;