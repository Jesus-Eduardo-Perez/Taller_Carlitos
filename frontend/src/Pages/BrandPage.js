import React from "react";
import styles from '../CSS/BrandPage.module.css';
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

function BrandPage () {
    const {brandName} = useParams();
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.options}>
                <div className={styles.option_button}>
                    <IoReturnUpBack className={styles.icon}/>
                    <p>Regresar </p>
                </div>
                <h1>{brandName.toUpperCase()}</h1>
            </div>
        </div>
    );
}
export default BrandPage;