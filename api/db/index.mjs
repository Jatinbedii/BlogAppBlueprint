import mongoose from 'mongoose';
export const  dbconnect=async()=>{
    try {
        await mongoose.connect('mongodb+srv://jatinbedi733:jatinbedi733@cluster0.iwjygkl.mongodb.net/?retryWrites=true&w=majority')
        console.log('db connected')
    } catch (error) {
        console.log('db not connected');
    }

}
