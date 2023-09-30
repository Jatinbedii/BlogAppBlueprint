import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie";
import { useContext } from "react";
import { GlobalInfo } from "../UserContext.mjs";

function Navbar() {
  const {username} = useContext(GlobalInfo);
  
  useEffect(()=>{
  axios.get('http://localhost:3000/profile', {withCredentials: true}).then(
).catch((err)=>{console.log(err)})
  }, [])

  function Logout(){
  Cookies.remove('token');
  window.location.reload();

  }
  
  return (
    
      <header>
        <nav className="flex justify-between">
        <div>Logo</div>
        {username?<div className="flex gap-2"><div>{username}</div> <div><Link to={'/create'}>Create</Link></div><button onClick={Logout}>Logout</button></div> :<div className="flex gap-2"><div><Link to={'/login'}>Login</Link></div> <div><Link to={'/register'}>Register</Link></div></div>}
        
        </nav>
      </header>
  )
}

export default Navbar
