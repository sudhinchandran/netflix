import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import {imageUrl,API_KEY} from '../../Constants/constants'
import './RowPost.css'

function RowPost(props) {
    const [url, seturl] = useState('')
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
  
    const [movie, setmovie] = useState([])
    useEffect(() => {
        axios.get(props.url).then((response)=>{
            console.log(response.data.results[1]);
            setmovie(response.data.results);
        })
    }, [])
    const handleMovie = (id)=>{
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            if(response.data.results.length !== 0){
                seturl(response.data.results[0])
            }
        })
    }
    return (
        <div className="row">
            <h2> {props.title} </h2>
            <div className="posters">
                {movie.map((obj)=>
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? "smallposter" : "poster"} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

                )}
                

            </div>
            { url && <YouTube videoId={url.key} opts={opts} />}

        </div>
    )
}

export default RowPost
