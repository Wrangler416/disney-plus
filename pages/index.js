import {gql, GraphQLClient} from 'graphql-request'
import Image from 'next/image'
import Section from "../components/Section"
import Navbar from '../components/Navbar'
import dis from '../public/dis.png'
import marv from '../public/marvel.jpeg'
import nat from '../public/nat.png'
import pix from '../public/pix.jpg'
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

export const getStaticProps = async () => {

  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN

    }
  })

const videosQuery = gql `
        query {
          videos {
            id, 
            title, 
            description,
            seen,
            slug,
            tags,
            mp4 {
              url
            }
            thumbnail {
              url
            }
          }
        }
        `
const accountQuery = gql `
            query {
              account(where:{ id:"ckyrtohz4kcal0b28sc27auyt"}) {
                username
                avatar {
                  id
                  url
                }
              }
            }
`


const data = await graphQLClient.request(videosQuery) 
const videos = data.videos

const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account 



return {
  props: {
    videos,
    account 
  }
}
}


export default function Home({videos, account}) {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  return (
   <>
    <div className="app"> 
    <Navbar account={account}/>

        <Card>
          <div style={{ position: "relative" }}>
            <CardMedia style={{ height: "400px", width: "100%" }}  component="img" image={randomVideo(videos).thumbnail.url}   alt="movie-image"/> 
             <div style={{position: "absolute", top: "80%", left: "50%",transform: "translateX(-50%)"}}><Button className="but" variant="contained">Start Watching</Button></div>  
             </div>
         </Card>
  
                <div className="video-feed"> 
                  <a href="#family"><div className="category" id="family"><Image className="category"src={dis} /></div></a>
                  <a href="#drama"><div className="category" id="drama"><Image className="category"src={marv} /></div></a>
                  <a href="#action"><div className="category" id="action"><Image  className="category" src={pix}/></div></a>
                  <a href="#adventure"><div className="category" id="adventure"><Image className="category"src={nat} /></div></a>
                  </div>
            <div className="sections">
                <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/>
                <Section id="family" genre={'Family'} videos={filterVideos(videos, 'family')}/>
                <Section id="drama" genre={'Drama'} videos={filterVideos(videos, 'drama')}/>
                <Section id="thriller" genre={'Thriller'} videos={filterVideos(videos, 'thriller')}/>
                <Section id="action" genre={'Action'} videos={filterVideos(videos, 'action')}/>
                <Section id="adventure" genre={'Adventure'} videos={filterVideos(videos, 'adventure')}/>
         
            </div>
    </div>
   
   
   </>
  )

}
