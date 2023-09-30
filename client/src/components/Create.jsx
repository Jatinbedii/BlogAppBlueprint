import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useContext } from "react";
import { GlobalInfo } from "../UserContext.mjs";
import { useNavigate} from 'react-router-dom'

function Create() {
  const navigate = useNavigate
  const {username} = useContext(GlobalInfo);

  const [title,settitle] = useState('');
  const [summary,setsummary] = useState('');
  const [content,setcontent] = useState('');
  const [pic,setpic] = useState('https://c1.wallpaperflare.com/preview/372/239/789/paper-office-background-blog-blogger-browsing.jpg');

 function uploadimage(file){
  const data = new FormData();
  data.append("file",file)
  data.append("upload_preset","Chat-app")
  data.append("cloud_name","jatinbedi")
  axios.post('https://api.cloudinary.com/v1_1/jatinbedi/image/upload',data).then((res)=>{setpic(res.data.secure_url)}).catch(err=>console.log(err));
  }
  function createpost(e){
    e.preventDefault();
     axios.post('http://localhost:3000/create',{title:title,summary:summary,content:content,pic:pic,user: username}).then(res=>{
      if(res.status!=200){
        return console.log('error');
      }
    
     }).catch(er=>{return console.log(er)})
    navigate('/')
  }
  return (
    <div>
      <form>
         <input value={title} onChange={(e)=>{settitle(e.target.value)}} type="text" placeholder="title"/>
         <input type="text" placeholder="Summary" onChange={(e)=>{setsummary(e.target.value)}} value={summary}/>
         <input type="file" accept="image/*" onChange={(e)=>{uploadimage(e.target.files[0])}}/>
         <ReactQuill value={content} onChange={setcontent}/>
         <button type='submit' onClick={createpost}>Create</button>
      </form>
    </div>
  )
}

export default Create
