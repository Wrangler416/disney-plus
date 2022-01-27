// import Image from 'next/image'


const Card = ({thumbnail}) => {
  
    return (
      <div> 
      <img height="200px"src={thumbnail.url} />
      </div>

      // <Image src={ height={100} width={200}></Image>

 
    )
}

export default Card

