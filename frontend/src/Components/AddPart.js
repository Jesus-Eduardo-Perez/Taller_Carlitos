import React, { useState } from "react";
import styles from '../CSS Components/AddBrand.module.css';
import { createPart } from "../Services/partsService";

function AddPart({ brand, onClose, onPartAdded }) {
    const [image, setImage] = useState(null);
    const [yearStart, setYearStart] = useState("");
    const [yearEnd, setYearEnd] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        brand_id: brand.id,
        model: "",
        car_make: brand.name,
        car_model: "",
        year_range: "",
        condition: "Usada",
        price: "",
        stock: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manejo de los años, pero sin crear campos separados en formData
    const handleYearChange = (type, value) => {
        if (type === "start") {
            setYearStart(value);
            setFormData((prev) => ({ ...prev, year_range: `${value}-${yearEnd}` }));
        } else {
            setYearEnd(value);
            setFormData((prev) => ({ ...prev, year_range: `${yearStart}-${value}` }));
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPart(formData, image);
            alert("✅ Pieza agregada con éxito");
            onClose();
            if (onPartAdded) onPartAdded(); // refrescar lista de piezas
        } catch (error) {
            console.error("Error al crear pieza:", error);
            alert("❌ Error al crear la pieza");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Agregar pieza ({brand.name})</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label>Nombre de la pieza</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label>Modelo del vehículo</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label>Rango de años</label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <input
                                type="number"
                                placeholder="Desde"
                                value={yearStart}
                                onChange={(e) => handleYearChange("start", e.target.value)}
                                min="1950"
                                max={new Date().getFullYear()}
                            />
                            <input
                                type="number"
                                placeholder="Hasta"
                                value={yearEnd}
                                onChange={(e) => handleYearChange("end", e.target.value)}
                                min={yearStart || "1950"}
                                max={new Date().getFullYear() + 1}
                            />
                        </div>
                    </div>

                    <div className={styles.form_group}>
                        <label>Condición</label>
                        <select name="condition" value={formData.condition} onChange={handleChange}>
                            <option value="Usada">Usada</option>
                            <option value="Nueva">Nueva</option>
                            <option value="Reacondicionada">Reacondicionada</option>
                        </select>
                    </div>

                    <div className={styles.form_group}>
                        <label>Precio ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label>Stock disponible</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label>Imagen (opcional)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <button type="submit" className={styles.saveButton}>Guardar pieza</button>
                </form>
            </div>
        </div>
    );
}

export default AddPart;
