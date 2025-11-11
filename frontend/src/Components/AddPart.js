import React from "react";
import styles from '../CSS Components/AddBrand.module.css';
/*import { createPart } from "../Services/partsService";*/
function AddPart ({brand, onClose}) {
    /*const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name:'',
        brand_id: brand.id,
        model: '',
        car_make: brand.name,
        year_range: '',
        condition: '',
        price: 0,
        stock: 0,
        description: ''
        });*/ 
    return(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Agregar marca</h2>
            </div>
        </div>
    );
}
export default AddPart;