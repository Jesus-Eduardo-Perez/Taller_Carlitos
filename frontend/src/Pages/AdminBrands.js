import React, {useState, useEffect} from "react";
import Header from "../Components/Header";
import styles from "../CSS/AdminBrands.module.css"
import { IoIosAddCircleOutline } from "react-icons/io";
import AddBrand from "../Components/AddBrand";
import { getBrands } from "../Services/brandService";
import BrandComponent from "../Components/BrandComponent";
function AdminBrands () {
    const [brands, setBrands] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadBrands = async () => {
      const data = await getBrands();
      setBrands(data);
    }
    useEffect(() => {
      loadBrands();
    }, []);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.options}>
                <h1>Marcas</h1>
                <div className={styles.option_button} >
                  <p>Agregar</p>
                  <button onClick={handleOpenModal}> 
                     <IoIosAddCircleOutline className={styles.icon} />
                  </button>
                </div>
            </div>
            {brands.map((brand) => (
                <BrandComponent
                  key={brand.id}
                  brand = {brand}
                />
            ))}
            
             <AddBrand
             isOpen={isModalOpen}
             onClose={handleCloseModal}
             />
        </div>
    );
}

export default AdminBrands;