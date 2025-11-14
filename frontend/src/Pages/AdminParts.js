import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import styles from '../CSS/AdminParts.module.css';
import { IoIosAddCircleOutline, IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import AddPart from "../Components/AddPart";
import { getBrands } from "../Services/brandService";

function AdminParts() {
    const [brands, setBrands] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Obtener marcas del backend al montar el componente
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (error) {
                console.error("Error al obtener las marcas:", error);
            }
        };
        fetchBrands();
    }, []);

    // Navegación entre marcas
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? brands.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === brands.length - 1 ? 0 : prevIndex + 1));
    };

    // Marca actual
    const currentBrand = brands[currentIndex];

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.options}>
                <h2>Piezas</h2>

                <div className={styles.option_brands}>
                    <IoIosArrowDropleft onClick={handlePrev} className={styles.icon} />
                    <p>{currentBrand ? currentBrand.name : "Cargando..."}</p>
                    <IoIosArrowDropright onClick={handleNext} className={styles.icon} />
                </div>

                <div className={styles.option_button}>
                    <p>Agregar</p>
                    <button onClick={() => setIsModalOpen(true)}>
                        <IoIosAddCircleOutline className={styles.icon} />
                    </button>
                </div>
            </div>

            {isModalOpen && currentBrand && (
                <AddPart
                    brand={currentBrand}
                    onClose={() => setIsModalOpen(false)}
                    onPartAdded={() => window.location.reload()} // 🔄 refresca al agregar
                />
            )}
        </div>
    );
}

export default AdminParts;
