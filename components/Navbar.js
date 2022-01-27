import Link from 'next/link'
import Image from 'next/image'
import plus from '../public/dlogo.png'

const Navbar = ({account}) => {
    return (
        <>
        <div className="navbar">
            <Link  href="/"><Image src={plus} alt={"disney logo"} width={100} height={60}></Image></Link>
       
            <div className="account-info">
              <p>Welcome {account.username}</p>
              <img className="avatar" src={account.avatar.url}/>
            </div>
            </div>
        </>
    )
}

export default Navbar
