import React, {useState} from "react";
import styles from '../CSS Components/BrandComponent.module.css'
import { CiTrash, CiEdit } from "react-icons/ci";
import EditBrandModal from "./EditBrandModal";
import { updateBrand, deleteBrand } from "../Services/brandService";
import DeleteBrandModal from "./DeleteBrandModal";
function BrandComponent({brand}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleUpdate = async (id, data) => {
        await updateBrand(id, data.name, data.image);
        window.location.reload();
    };

    const handleDelete = async () => {
        await deleteBrand(brand.id);
        window.location.reload();
    }
    return(
        <div className={styles.container}>
            <h1>{brand.name}</h1>
            <div className={styles.buttons_grid}>
                <CiEdit className={styles.icon} onClick={() => setShowEditModal(true)}/>
                <CiTrash className={styles.icon} onClick={() => setShowDeleteModal(true)}/>
            </div>
            {showEditModal && (
                <EditBrandModal 
                   onClose={() => setShowEditModal(false)}
                   brand = {brand}
                   onUpdate = {handleUpdate}
                />
            )}
            {showDeleteModal && (
                <DeleteBrandModal 
                brand = {brand}
                onConfirm = {handleDelete}
                onCancel = {() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

export default BrandComponent;