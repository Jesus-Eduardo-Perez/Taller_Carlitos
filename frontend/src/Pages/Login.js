import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Styles from '../CSS/Login.module.css'
import { CiUser, CiLock } from "react-icons/ci";
import { login } from "../Services/authService";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate =useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
    
            if (data.redirectPage) {
                navigate(data.redirectPage);
            } else {
                throw new Error('No se encontró una página de redirección.');
            }
        } catch (err) {
            setError(err); // Muestra el mensaje de error en pantalla
        }
    };
    return (
        <div className= {Styles.container}>
            <Header />
             <div className={Styles.container_login}>
                    <h1>Bienvenido</h1>
                    <p>Por favor, ingrese su correo y contraseña.</p>
    
                    {error && <p className={Styles.error}>{error}</p>}
    
                    <form onSubmit={handleLogin}>
                        <div className={Styles.input_box}>
                            <input
                                type='text'
                                placeholder='Correo'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <CiUser className={Styles.icon} />
                        </div>
    
                        <div className={Styles.input_box}>
                            <input
                                type='password'
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <CiLock className={Styles.icon} />
                        </div>
    
    
                        <button className={Styles.button} type='submit'>Iniciar sesión</button>
                    </form>
                </div>
        </div>
    );
}

export default Login;