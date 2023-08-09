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
//  async function loginUser(email, password) {
//   try {
//      const user = await userSchema.findOne({ $or: [{ email: email }] });
      
//     if (user) {
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (passwordMatch) {
//         const token = jwt.sign({ _id : user._id, name: user.name }, "very secret value", { expiresIn: "1h" });
//         return { message: "Login successfully!", token };
//       } else {
//         return { message: "Password does not match" };
//       }
//     } else {
//       return { message: "No user found!" };
//     }
//   } catch (err) {
//     console.log(err);
//     return { message: err };
//   }
// }

const loginUser = async (req, res) => {
	let existUser = null;
	try {
		if ((req.body.loginInfo)) {
			existUser = await userSchema.findOne({ email: req.body.loginInfo });
		} 
		if (!existUser) {
			return res.status(401).json("Wrong Email/Password");
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			existUser.password
		);

		if (!validPassword) {
			return res.status(401).json("Wrong Email/Password");
		}
		const token = jwt.sign(
			{
        _id : existUser._id, name: existUser.name
			},
      "very secret value",
			{ expiresIn: "2 days" }
		);
		existUser.lastLogin = Date.now();
		await existUser.save();
		return res.status(200).json({ user: existUser, token: token });
	} catch (err) {
		return res.status(500).json(err);
	}
};

export { loginUser,sendVerificationCode };