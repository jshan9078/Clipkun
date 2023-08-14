import { useState,useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios'


function MainPage() {
    const location = useLocation();  
    const navigate = useNavigate();
    const  [file, setFile] = useState();
    const  [name, setName] = useState();
    const  [anime, setAnime] = useState();
    const  [episode, setEpisode] = useState();

    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/main`}});
    }

    const handleSubmit = (e) => {
        navigate(`/manage`,{state:{user:location.state.user}});
    }

    useEffect(()=>{
        if (!location.state){
            routeLogin();
        }
    },[])

    const upload=(e)=>{
        e.preventDefault();
        const owner = location.state.user.name;
        const formData = new FormData();
        formData.append("video", file);
        formData.append("name", name);
        formData.append("anime", anime);
        formData.append("episode", episode);
        formData.append("owner", owner);
        axios.post('http://localhost:5000/clip', formData)
        .then(res => {
            alert(res.data);
        }).catch(err => console.log(err))
    }

    return ( location.state ? 
        (<div id="mainPage">
            {location.state.user.userCount}
            {location.state.user.name}
            {location.state.user.clipCount}
            {location.state.user.storage}
            <h1 id="mainPage">mainpage</h1>
            <button id="confirmButton" onClick={handleSubmit}>Manage Clips</button>
            <input
                type="file"
                accept="video/mp4"
                name="video"
                onChange={(e)=>{
                    setFile(e.target.files[0]);
                }}
            />
            <div>
              <label id="signupLabel" htmlFor="email">
                <strong>Clip Name</strong>
              </label>
              <input
                id="field"
                type="email"
                placeholder="Enter clip name"
                autoComplete="off"
                name="email"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label id="signupLabel" htmlFor="email">
                <strong>Anime</strong>
              </label>
              <input
                id="field"
                type="email"
                placeholder="Enter Anime name"
                autoComplete="off"
                name="email"
                onChange={(e) => setAnime(e.target.value)}
              />
            </div>
            <div>
              <label id="signupLabel" htmlFor="email">
                <strong>Episode</strong>
              </label>
              <input
                id="field"
                type="email"
                placeholder="Enter episode number"
                autoComplete="off"
                name="email"
                onChange={(e) => setEpisode(e.target.value)}
              />
            </div>
            <button onClick={(e)=>upload(e)}>Confirm</button>

        </div>) : <div></div>);
    
    
    

  }
  
  export default MainPage;
  