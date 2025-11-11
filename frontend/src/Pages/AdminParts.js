import React, {useState} from "react";
import Header from "../Components/Header";
import styles from '../CSS/AdminParts.module.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import AddPart from "../Components/AddPart";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
function AdminParts () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.options}>
                <h2>Piezas</h2>
                <div  className={styles.option_button}>
                    <IoIosArrowDropleft />
                    <p>Nissan</p>
                    <IoIosArrowDropright />
                </div>
                <div className={styles.option_button} >
                    <p>Agregar</p>
                    <button 
                    onClick={() => setIsModalOpen(true)}> 
                       <IoIosAddCircleOutline className={styles.icon} />
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <AddPart
                onClose = {() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
export default AdminParts;