import React from "react";
import 'tachyons';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn === true){
        return (
            <nav className="navigation"> 
                <p 
                onClick={() => onRouteChange('signin')} //changes the route dynamically. function runs on click
                className="fw4 tracked black link grow pa1 pointer ma2 mr2"
                >Sign out</p> 
            </nav>
        )
    } else if (isSignedIn === false) {
        return (
            <nav className="navigation"> 
                <p 
                onClick={() => onRouteChange('signin')} //changes the route dynamically. function runs on click
                className="fw4 tracked black link grow pa1 pointer ma2 mr2"
                >Sign in</p>
                <p className='fw4 tracked black pa1 ma2'>|</p>
                <p 
                onClick={() => onRouteChange('register')} //changes the route dynamically. function runs on click
                className="fw4 tracked black link grow pa1 pointer ma2"
                >Register</p> 
             </nav>
        )
    }

   
}

export default Navigation; 