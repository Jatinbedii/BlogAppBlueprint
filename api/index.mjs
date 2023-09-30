import express from 'express';
const app = express();
import cors from 'cors';
import { dbconnect } from './db/index.mjs';
import User from './model/User.mjs';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Post from './model/Post.mjs';

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser())
app.use(express.json());

dbconnect();
app.post('/register',async(req,res)=>{
    try {
        const{username,password} = req.body;
        const hash = bcrypt.hashSync(password,10);
        const user =   await User.create({username,password:hash});
        return  res.json(user);}
     catch (error) {
        return res.status(400).json({message: 'user not created'});
    }
})

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username:username});
    if(!user){
        return res.status(400).json({message: 'User not found'});
    }
     
    if(bcrypt.compareSync(password, user.password)){
      const token =  jwt.sign({username}, 'jatinbedi',{expiresIn: '18000s'})
        
        return res.cookie('token',token).json({id: user._id,
        username : user.username});
    }else{
        return res.status(400).json({message: 'Incorrect password'});
        
    }
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
    jwt.verify(token,'jatinbedi', function(err,decoded){
        if(err){
            return console.log(err);
        }else{
            return res.json(decoded);
        }
    })}
    

})

app.post('/create',async(req,res)=>{
    try {
  const  {user,summary,title,content,pic}=req.body;
  const post =   await Post.create({user,summary,title,content,pic});

  res.json(post).status(200)

    } catch (error) {
        res.json({message:'error'}).status(400);
    }
    
})


app.get('/posts',async(req,res)=>{
    const posts = await Post.find();
    res.json(posts);
});
app.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    if(id){
       const data = await Post.findById(id);
       res.json(data);
    }else{
        console.log('error').status(400);
    }
    
})

app.listen(3000,()=>{
    console.log('app is listening')
})

