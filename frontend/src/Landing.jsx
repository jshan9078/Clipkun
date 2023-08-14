import { useState } from "react";
import axios from 'axios'
import { BrowserRouter,Routes,Route,useNavigate  } from 'react-router-dom';

function Landing() {
 
    let navigate = useNavigate(); 
    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path);
    }

    const routeSignup = () =>{ 
        let path = `/signup`; 
        navigate(path);
    }

  return (
    
    <div id="landingPage">
        <h1 id="mainName">Clip-kun</h1>
        <h2 id="slogan">The Anime Clipping Tool</h2>
        <h2 id="featureOne"><strong>Create and download  unlimited 30 second clips</strong></h2>
        <hr id="line"></hr>
        <h2 id="featureHeader"><strong>For the first 500 users...</strong></h2>
        <h2 id="featureTwo">Manage 50MB of footage online (shareable by links)</h2>
        <h2 id="featureTwo"><strong>That's roughly...</strong></h2>
        <h2 id="featureThree"><strong id="highlight">1500</strong> seconds of 360p</h2>
        <h2 id="featureThree"><strong id="highlight">700</strong>  seconds of 720p</h2>
        <h2 id="featureThree"><strong id="highlight">500</strong>  seconds of 1080p</h2>
        <div id="buttons">
            <button id="signupButton"  onClick={routeSignup} >Sign Up</button>
            <button id="loginButton" onClick={routeLogin} >Login</button>
        </div>
    </div>
  );
}

export default Landing;
