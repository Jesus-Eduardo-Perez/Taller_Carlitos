import React from "react";
import styles from '../CSS Components/Header.module.css'
import Taller_logo from '../Images/Taller_logo.png'
function Header () {
    return(
        <div className= {styles.Header}>
            <div className=  {styles.LogoContainer}>
                <img width={167} height={200} src = {Taller_logo} alt="Taller carlitos"/>
            </div>
            <div className={styles.OptionsBar}>
            </div>
        </div>
    );
}
export default Header;