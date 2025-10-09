import React, {useState} from "react";
import Header from "../Components/Header";
import styles from "../CSS/AdminBrands.module.css"
import { IoIosAddCircleOutline } from "react-icons/io";
import AddBrand from "../Components/AddBrand";
function AdminBrands () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    return(
        <div className={styles.container}>
            <Header />
            <div>
                <h1>Marcas</h1>
                <div className={styles.option_button} >
                  <p>Agregar</p>
                  <button onClick={handleOpenModal}> 
                     <IoIosAddCircleOutline className={styles.icon} />
                  </button>
                </div>
            </div>
             <AddBrand
             isOpen={isModalOpen}
             onClose={handleCloseModal}
             />
        </div>
    );
}

export default AdminBrands;