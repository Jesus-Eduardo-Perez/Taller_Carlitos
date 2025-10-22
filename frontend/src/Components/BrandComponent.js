import React, {useState} from "react";
import styles from '../CSS Components/BrandComponent.module.css'
import { CiTrash, CiEdit } from "react-icons/ci";
import EditBrandModal from "./EditBrandModal";
import { updateBrand } from "../Services/brandService";
function BrandComponent({brand}) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenModal = () => {
      setShowEditModal(true);
    };
    const handleCloseModal = () => {
      setShowEditModal(false);
    };

    const handleUpdate = async (id, data) => {
        await updateBrand(id, data.name, data.image);
        window.location.reload();
    };
    return(
        <div className={styles.container}>
            <h1>{brand.name}</h1>
            <div className={styles.buttons_grid}>
                <CiEdit className={styles.icon} onClick={handleOpenModal}/>
                <CiTrash className={styles.icon}/>
            </div>
            {showEditModal && (
                <EditBrandModal 
                   isOpen={showEditModal}
                   onClose={handleCloseModal}
                   brand = {brand}
                   onUpdate = {handleUpdate}
                />
            )
            }
        </div>
    );
}

export default BrandComponent;