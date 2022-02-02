import React from "react"
import MovieCard from './MovieCard'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

const Section = ({videos, genre}) => {

    return (
        <div className="section">
           
               <div className="video-feed">
                    
                {videos.map(video => (
                
                   <a className="mov" passHref href={`/video/${video.slug}`}>
                       <Grid spacing={2}>
                           <Card style={{backgroundColor: "#13151F"}}>
                           <MovieCard thumbnail={video.thumbnail}/> 
                           </Card>
                      
                       </Grid>
                   
                   </a>
      
                ))}
                </div>

        </div>
    )
}

export default Section 


