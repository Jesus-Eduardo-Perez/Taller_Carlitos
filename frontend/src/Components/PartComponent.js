import React, {useState} from "react";
import styles from '../CSS Components/BrandComponent.module.css';
import { CiTrash, CiEdit } from "react-icons/ci";
/*import { deletePart, updatePart } from "../Services/partsService";*/
function PartComponent({part}) {
    /*const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDelete = async () => {
        await deletePart(part.id)
        window.location.reload();
    }*/
    return (
        <div className= {styles.container}>
            <h1>{part.name}</h1>
            <div className={styles.buttons_grid}>
                 <CiEdit className={styles.icon}/>
                 <CiTrash className={styles.icon} />
            </div>
        </div>
    );
}
export default PartComponent;