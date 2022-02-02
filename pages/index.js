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
import Grid from '@mui/material/Grid'
// import { withTheme } from '@emotion/react'
import Typography from '@mui/material/Typography'
import plus from '../public/dlogo.png'
import Container from '@mui/material/Container'


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
  
    <Navbar account={account}/>
      <Container maxWidth="xl">
         <Container style={{ position: "relative", height: "50%", width: "100%"}}>
            <Image src={randomVideo(videos).thumbnail.url} width={800} height={400}></Image>

            <CardMedia style={{position: "absolute", top: "70%", left: "50%",transform: "translateX(-50%)"}}>
          <Image src={plus} height={70} width={120}></Image>
          </CardMedia>

          <CardMedia style={{margin: "2px", position: "absolute", top: "90%", left: "50%",transform: "translateX(-50%)"}}>
          <Button className="but" variant="contained">Get the disney bundle</Button>
          </CardMedia>
          
         </Container>

          


              <Grid spacing={2}>
              </Grid>
                <div className="video-feed"> 
                  <a href="#family"><div className="category" id="family"><Image className="category"src={dis} /></div></a>
                  <a href="#drama"><div className="category" id="drama"><Image className="category"src={marv} /></div></a>
                  <a href="#action"><div className="category" id="action"><Image  className="category" src={pix}/></div></a>
                  <a href="#adventure"><div className="category" id="adventure"><Image className="category"src={nat} /></div></a>
                  </div>

        <Grid container spacing={2}>
              <Card style={{backgroundColor: "#13151F"}}>
                <Typography style={{color: "white"}}>
                  Recommended for you
                </Typography>
              <Section style={{color: "white"}} id="recommendedforyou" videos={unSeenVideos(videos)}/>
              </Card>

              <Card style={{backgroundColor: "#13151F"}}>
              <Typography style={{color: "white"}}>
                  Adventure
                </Typography>
              <Section id="adventure"  videos={filterVideos(videos, 'adventure')}/>
              </Card>
        
            <Card style={{backgroundColor: "#13151F"}}>
            <Typography style={{color: "white"}}>
                  Drama
                </Typography>
            <Section id="drama" videos={filterVideos(videos, 'drama')}/>
              </Card>

              <Card style={{backgroundColor: "#13151F"}}>
              <Typography style={{color: "white"}}>
                  Thriller
                </Typography>
              <Section id="thriller"  videos={filterVideos(videos, 'thriller')}/>
              </Card>


              <Card style={{backgroundColor: "#13151F"}}>
              <Typography style={{color: "white"}}>
                  Action
                </Typography>
              <Section id="action"  videos={filterVideos(videos, 'action')}/>
              </Card>
          </Grid>
      </Container>
 
   </>
  )
}
