import { useState } from "react";
import {BrowserRouter,Routes,Route,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'


const VideoCard = ({video}) => {



    return (
        <div id="video">
            <h1>{video.name} </h1>
            <h1>{video.anime} </h1>
            <h1>{video.episode} </h1>
            <h1>{video.url} </h1>
            <h1>{video.size} </h1>
        </div>
      
    );
  }
  
  export default VideoCard;
  