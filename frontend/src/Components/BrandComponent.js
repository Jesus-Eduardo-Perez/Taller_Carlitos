import React from "react";
import styles from '../CSS Components/BrandComponent.module.css'
import { CiTrash, CiEdit } from "react-icons/ci";
function BrandComponent({nameBrand}) {
    return(
        <div className={styles.container}>
            <h1>{nameBrand}</h1>
            <div className={styles.buttons_grid}>
                <CiEdit className={styles.icon}/>
                <CiTrash className={styles.icon}/>
            </div>
        </div>
    );
}

export default BrandComponent; 