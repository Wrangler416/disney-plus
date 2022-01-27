import React from "react"
import Card from './Card'


const Section = ({videos, genre}) => {

    return (
        <div className="section">
               <h3>{genre}</h3>
               <div className="video-feed">
                    
                {videos.map(video => (
                
                   <a className="mov" passHref href={`/video/${video.slug}`}>
                       <Card thumbnail={video.thumbnail}/> 
                   </a>
      
                ))}
                </div>

        </div>
    )
}

export default Section 


