import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validators from "validator";
 
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
     required: true,
      validate: [
      { validator: validators.isEmail, msg: "Invalid email" } ]
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
   },
   address : {
    type: String,
    },
  gender: {
    type: String,
  },
  token:{
    type:String,
    default:""
  },
  role: {
    type: String,
  },
   image: { 
    type: String,
  },
  isEmailVerified:{
   type: Boolean,
  },

  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  
}, { timestamps: true });

 
/////////////////FUNCTION/////////////////
userSchema.methods.register = async function () {

  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  return await this.save();

};
////////////////////////////////////////////

export default mongoose.model("userSchema", userSchema);
