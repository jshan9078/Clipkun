import { useState,useEffect } from "react";
import { BrowserRouter,Routes,Route,useNavigate,useLocation  } from 'react-router-dom';
import axios from 'axios';
import VideoCard from './VideoCard';


function Manage() {
    const [clips, setClips] = useState([]);
    const location = useLocation();  
    const navigate = useNavigate()

    const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path,{state:{path:`/manage`}});
    }

    useEffect(()=>{
        if (!location.state){
            routeLogin();
        }
        else{
            const owner=location.state.user.name;
            axios.post('http://localhost:5000/getclips', {owner})
            .then(res => {
                console.log(res.data);
                setClips(res.data);
            }).catch(err => console.log(err))
        }
    },[])

    return ( location.state ? 
        (<div id="managePage">
            <h1 id="mainName">Clip-kun</h1>
            <h2 id="header">Manage Clips</h2>
            <h2 id="storageinfo">Storage: <strong id="highlight2"> {(location.state.user.storage/1000000).toFixed(1)} / 100 MB </strong> </h2>
            <h2 id="storageinfo">Clip Count: <strong id="highlight2">{location.state.user.clipCount} </strong> </h2>
            <div id="container">
            {
                clips.map((clip)=>(<VideoCard video={clip}/>))
            }
            </div>
        </div>) : <div></div>);

  }
  
  export default Manage;
  