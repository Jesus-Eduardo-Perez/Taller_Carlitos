import React from "react";
import Header from "../Components/Header";
import styles from '../CSS/AdminParts.module.css'
import { IoIosAddCircleOutline } from "react-icons/io";
function AdminParts () {
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.options}>
                <h2>Piezas</h2>
                <div>
                    <p>Nissan</p>
                </div>
                <div className={styles.option_button} >
                    <p>Agregar</p>
                    <button > 
                       <IoIosAddCircleOutline className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AdminParts;