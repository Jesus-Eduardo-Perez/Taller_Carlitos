import React, {useState, useEffect} from "react";
import styles from '../CSS/Catalog.module.css'
import Header from '../Components/Header'
import { getBrands } from "../Services/brandService";
import { API_URL } from "../utils";
import { Link } from "react-router-dom";
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
                        <Link 
                        key={brand.id}
                        to={`/marcas/${brand.name.toLowerCase()}`}
                        className= {styles.imageButton}>
                           <img src={`${API_URL}${brand.image_url}`} alt={brand.name} className={styles.image}/> 
                        </Link>
                    ))}
                </div>
            </div>
        </div>  
    );
}

export default Catalog;
