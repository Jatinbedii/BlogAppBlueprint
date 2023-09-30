import { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalInfo } from "../UserContext.mjs";


function SinglePost() {
    
    const {username} = useContext(GlobalInfo);
    const [data,setdata] = useState(null);
    const {id} = useParams();
    useEffect(() => {
      axios(`http://localhost:3000/post/${id}`).then((res)=>{console.log(res); setdata(res.data)}).catch((err)=>console.log(err))
        
    }, [])
    
  return (
    <div>
    {data?<div>
        {data.title}
        created by {data.user}
        <hr/>
        {data.user==username?<button>Delete</button>:<div></div>}
        <hr/>
        <img src={data.pic} alt="blog"/>
       <div dangerouslySetInnerHTML={{__html:data.content}} />
        {data.summary}
    </div> :<div>Loading</div>}
    </div>
  )
}

export default SinglePost
