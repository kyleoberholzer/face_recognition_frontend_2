import React from 'react';
import logoImage from './logo2.png'; 
import './logo.css';
import Tilt from 'react-parallax-tilt';


const Logo = () => {
    return (
        
            <div className='logo'>
                <img src={logoImage} alt="Company Logo" />
            </div>
       
    );
}

export default Logo;
