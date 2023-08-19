import { useNavigate  } from 'react-router-dom';

function Landing() {
 
    let navigate = useNavigate(); 
    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/main`}});
    }

    const routeSignup = () =>{ 
        let path = `/signup`; 
        navigate(path);
    }

  return (
    
    <div id="landingPage">
        <h1 id="mainName">Clip-kun</h1>
        <h2 id="slogan">The Anime Clipping Tool</h2>
        <h2 id="featureOne"><strong>Create and download 60 second clips</strong></h2>
        <h2 id="featureOne">Manage <strong id="highlight">15 clips* </strong> online </h2>
        <h2 id="featureTwo">(shareable by links)</h2>
        <div id="buttons">
            <button id="signupButton"  onClick={routeSignup} >Sign Up</button>
            <button id="loginButton" onClick={routeLogin} >Login</button>
        </div>
        <h2 id="disclaimer">*clips can be deleted</h2>
    </div>
  );
}

export default Landing;
