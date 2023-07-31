 import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://paraecommerce:paraecommerce@cluster0.gitjjrk.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{

    console.log('db connected');


})
.catch((err)=>{

    console.log(err);

         })

 export default  mongoose;