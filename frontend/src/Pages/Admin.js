import React, {useState, useEffect} from "react";
import styles from '../CSS/Admin.module.css'
import Header from '../Components/Header'
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../Services/authService";
import { FaCar } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

function Admin() {
    const navigate = useNavigate();

    const [user, setUser] = useState({name: ''});
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const userData = await getUserProfile(token);
                if (userData) {
                    setUser(userData)
                }
            }
        };

        fetchUser();
    }, []);
    const options = [
        { id: 1, nombre: "Marcas", icon: <FaCar className={styles.icon}/>, ruta: "/admin/marcas"},
        { id: 2, nombre: "Piezas", icon: <FaTools className={styles.icon}/>,ruta: "/admin/piezas"}
    ]
    return(
        <div className= {styles.container}>
            <Header />
            <p>Bienvenido {user.name}</p>
            <div className= {styles.container_admin}>
                <h1>Opciones</h1>
                <div className= {styles.brands_container}>
                    {options.map(option => (
                        <div className= {styles.buttonContainer}>
                            <button 
                           key={option.id}
                           className = {styles.imageButton}
                           onClick={() => {
                            if(option.ruta){
                                navigate(option.ruta)
                            }
                        }}>
                            {option.icon}
                        </button>
                        <h4>{option.nombre}</h4>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Admin;