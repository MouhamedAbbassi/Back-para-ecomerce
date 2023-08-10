import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/ParaDB')
.then(()=>{

    console.log('db connected');


})
.catch((err)=>{

    console.log(err);

         })

 export default  mongoose;