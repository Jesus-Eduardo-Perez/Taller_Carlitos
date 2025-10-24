import React, {useState, useEffect} from "react";
import styles from '../CSS/Catalog.module.css'
import Header from '../Components/Header'
import { getBrands } from "../Services/brandService";
function Catalog() {
    const [brands, setBrands] = useState([]);
    const loadBrands = async () => {
        const data = await getBrands();
        setBrands(data)
    }
    useEffect(() => {
        loadBrands();
    }, [])
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <h2>Busca la pieza que necesites</h2>
                <div className={styles.gridContainer}>
                    {brands.map (brand => (
                        <button 
                        key={brand.id}
                        className= {styles.imageButton}>
                           <img src={`http://localhost:3000${brand.image_url}`} alt={brand.name} className={styles.image}/> 
                        </button>
                    ))}
                </div>
            </div>
        </div>  
    );
}

export default Catalog;
