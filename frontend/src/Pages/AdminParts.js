import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import styles from '../CSS/AdminParts.module.css';
import { IoIosAddCircleOutline, IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import AddPart from "../Components/AddPart";
import { getBrands } from "../Services/brandService";
import { getPartsByBrand } from "../Services/partsService";
import PartComponent from "../Components/PartComponent";

function AdminParts() {

    const [brands, setBrands] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (error) {
                console.error("Error al obtener marcas:", error);
            }
        };
        fetchBrands();
    }, []);

    // Marca actual
    const currentBrand = brands[currentIndex];

   useEffect(() => {
    if (!currentBrand) return;

    const fetchParts = async () => {
        try {
            const data = await getPartsByBrand(currentBrand.id);
            setParts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al obtener las piezas:", error);
            setParts([]);
        }
    };

    fetchParts();
}, [currentBrand]);

    // Navegación entre marcas
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? brands.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === brands.length - 1 ? 0 : prevIndex + 1
        );
    };

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

            {parts.length > 0 ? (
               parts.map((part) => (
                 <PartComponent key={part.id} part={part} />
               ))
             ) : (
               <p>No hay piezas para esta marca.</p>
             )}
             

            {isModalOpen && currentBrand && (
                <AddPart
                    brand={currentBrand}
                    onClose={() => setIsModalOpen(false)}
                    onPartAdded={() => {
                        const refreshParts = async () => {
                            const updated = await getPartsByBrand(currentBrand.id);
                            setParts(updated);
                        };
                        refreshParts();
                    }}
                />
            )}

        </div>
    );
}

export default AdminParts;
