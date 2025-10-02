import React from "react";
import styles from '../CSS/Catalog.module.css'
import Header from '../Components/Header'
function Catalog() {
    return(
        <div className={styles.Container}>
            <Header />
            <div className={styles.content}>
                <h2>Busca la pieza que necesites</h2>
            </div>
        </div>  
    );
}

export default Catalog;
