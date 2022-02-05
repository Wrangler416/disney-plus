import {gql, GraphQLClient} from 'graphql-request'
import Image from 'next/image'
import Section from "../components/Section"
import Navbar from '../components/Navbar'
import dis from '../public/dis.png'
import marv from '../public/marvel.jpeg'
import nat from '../public/nat.png'
import pix from '../public/pix.jpg'
import plus from '../public/dlogo.png'

import {
  Grid, 
  Card, 
  CardContent, 
  Typography,
  CardActionArea,
  Button,} 
  from '@mui/material'

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

<Grid container columns={{ xs: 4, md: 12 }}>
    <Grid item xs={12} md={16} lg={16} >
    <Card style={{backgroundColor: 'black'}}>
    <CardContent>
      <div style={{position: 'relative'}} >
        <Image style={{width: "100%"}}src={randomVideo(videos).thumbnail.url} width={1400} height={800}>
        </Image>
            <div style={{
              position: 'absolute', 
              color: '#001540', 
              top: '12%', 
              left: '73%', 
              transform: 'translateX(-50%)'
              }}>
              </div>
        <div style={{display: "flex", justifyContent: "center", margin: ".5rem"}}>
      <Image src={plus} height={50} width={80}></Image>
      <Button size="medium" className="but" variant="contained">Get the disney bundle</Button>
      </div>
  </div>
</CardContent>
</Card>        
</Grid>
</Grid>

<Grid   
    container columns={{ xs: 4, md: 12, lg: 16 }}
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
    <div style={{display: "flex", backgroundColor: "black", padding: ".5rem", justifyContent: "center", alignItems: "center", justifyContent: "space-evenly"}}>
    <Grid item xs={6} md={8} lg={12}>
    <a href="#family"><div id="family"><Image src={dis} width={200} height={100}/></div></a>
    </Grid>
    <Grid item xs={6} md={8} lg={12}>
    <a href="#drama"><div id="drama"><Image src={marv} /></div></a>
    </Grid>
    <Grid item xs={6} md={8} lg={12}>
    <a href="#action"><div id="action"><Image src={pix}/></div></a>
    </Grid>
    <Grid item xs={6} md={8} lg={12}>
    <a href="#adventure"><div id="adventure"><Image src={nat} /></div></a>
    </Grid>
    </div>

</Grid>



<Grid   
    container columns={{ xs: 6, md: 12, lg: 16 }}
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
        <Grid 
          item xs={6} md={12} lg={12}
        >
              <Card style={{backgroundColor: 'black', margin: "1rem"}}>
                    <CardContent>
                    <Typography style={{color: "white"}}>
                     Recommended for you
                    </Typography>
                    <Section 
                    style={{color: "white"}} 
                    id="recommendedforyou" 
                    videos={unSeenVideos(videos)}/>
                    </CardContent>
              </Card>
              </Grid>

            
              <Grid 
                item xs={6} md={12} lg={12}
                >
              <Card style={{backgroundColor: 'black', margin: "1rem"}}>
                  <CardActionArea>
                    <CardContent>
                    <Typography style={{color: "white"}}>
                    Adventure
                    </Typography>
                    <Section 
                    style={{color: "white"}} 
                    id="adventure" 
                    videos={filterVideos(videos, 'adventure')}/>
                    </CardContent>
                  </CardActionArea>
              </Card>
              </Grid>


              <Grid 
                item xs={6} md={12} lg={12}
                >
              <Card style={{backgroundColor: 'black', margin: "1rem"}}>
                  <CardActionArea>
                    <CardContent>
                    <Typography style={{color: "white"}}>
                   Drama
                    </Typography>
                    <Section 
                    style={{color: "white"}} 
                    id="drama" 
                    videos={filterVideos(videos, 'drama')}/>
                    </CardContent>
                  </CardActionArea>
              </Card>
              </Grid>


          
              <Grid 
                item xs={6} md={12} lg={12}
                >
              <Card style={{backgroundColor: 'black', margin: "1rem"}}>
                  <CardActionArea>
                    <CardContent>
                    <Typography style={{color: "white"}}>
                   Thriller
                    </Typography>
                    <Section 
                    style={{color: "white"}} 
                    id="thriller" 
                    videos={filterVideos(videos, 'thriller')}/>
                    </CardContent>
                  </CardActionArea>
              </Card>
              </Grid>


              <Grid 
                item xs={6} md={12} lg={12}
                >
              <Card style={{backgroundColor: 'black', margin: "1rem"}}>
                  <CardActionArea>
                    <CardContent>
                    <Typography style={{color: "white"}}>
                   Action
                    </Typography>
                    <Section 
                    style={{color: "white"}} 
                    id="action" 
                    videos={filterVideos(videos, 'action')}/>
                    </CardContent>
                  </CardActionArea>
              </Card>
              </Grid>
             
     </Grid>
 
   </>
  )
}
