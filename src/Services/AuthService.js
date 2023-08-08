import  userSchema  from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import  config  from "../config/config.js";


/////////////////// SEND EMAIL //////////////////
const  sendVerificationCode = async(name, email,code,res)=>{
  try {
      const transporter = nodemailer.createTransport({
          host:"smtp.gmail.com",
          port:587,
          secure:false,
          requireTLS:true,
          auth:{
              user:config.emailUser,
              pass:config.emailPassword
          }
      });
      const mailOptions={
          from:config.emailUser,
          to:email,
          subject: "Email Verification Code",
          text: `Hello ${name} Your verification code is: ${code}`,
      };
      transporter.sendMail(mailOptions,function(error){
          if (error) {
              console.log(error);
          } else {       
            return { message:"mail has been sent:- "};
          }   
      });
  } catch (error) {
      res.status(400).send({success:false,msg:error.messege});
  }
};

//////////////////////// LOGIN //////////////////////////
async function loginUser(email, password) {
  try {
    const user = await userSchema.findOne({ $or: [{ email: email }] });
  
    if (user) {
      console.log("Entered Password:", password);
      console.log("Stored Password:", user.password);
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", passwordMatch);

      if (passwordMatch) {
        
        const token = jwt.sign({ _id: user._id, name: user.name }, "very secret value", { expiresIn: "1h" });
        return { message: "Login successfully!", token, id: user._id };
      } else {
        return { message: "Password does not match" };
      }
    } else {
      return { message: "No user found!" };
    }
  } catch (err) {
    console.log(err);
    return { message: err };
  }
}

export { loginUser,sendVerificationCode };
