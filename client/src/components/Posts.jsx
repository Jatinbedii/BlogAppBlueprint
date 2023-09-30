import axios from "axios"
import { useEffect, useState } from "react"


function Posts() {

  const [data,setdata] = useState([]);
    useEffect(() => {
      axios('http://localhost:3000/posts').then((res)=>setdata(res.data)).catch((err)=>{console.log(err)})
    }, [])
    
  return (
    <div>
      {data.length>0? data.map((post)=>{return <div key={post._id}>

        <img className="w-[500px]" src={post.pic} alt="blog app"/>
        <a href={`post/${post._id}`}>{post.title}</a>
        {post.summary}

      </div>}) : <div>Loading</div>}

    </div>
  )
}

export default Posts