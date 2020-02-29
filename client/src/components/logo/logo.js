import React from 'react';
import burgerLogo  from '../../assets/images/plane-travel.png';
import './logo.css';

const Logo = (props) => (
    <div className="Logo">
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default Logo;