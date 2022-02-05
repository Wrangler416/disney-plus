import React from "react"
import MovieCard from './MovieCard'
import Card from '@mui/material/Card'

const Section = ({videos, genre}) => {

    return (
           
              <>
            <div className="video-feed">
                {videos.map(video => (

       
                   <a className="mov" passHref href={`/video/${video.slug}`}>
                      
                           <MovieCard thumbnail={video.thumbnail}/> 
                      
                      
                   </a>
                
               
                ))}
              </div>
             </>
    )
}

export default Section 


