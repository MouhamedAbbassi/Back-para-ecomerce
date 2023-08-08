import jwt from "jsonwebtoken";
import Client from "../Models/Client.js";
import { loginUser,sendVerificationCode } from "../Services/AuthService.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
 
///////////////////GENERATION OF CODE CONFIRMATION //////////////////
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
///////////////////  CONFIRMATION //////////////////
export async function VerificationCode(req,res) {
    const email=req.body.email;
    // Find client by  email and token
    const client = await Client.findOne({ email });
          if(req.body.code===client.token){
          client.isEmailVerified = true;
          client.token = "";
          try {
            await client.register();
            res.json({ message: "account has been verified!" });
          } catch (error) {
            res.status(500).json({ message: "An error occurred", error });
          }
          }else{
            await Client.deleteOne({ email });
            res.json({ message: "code incorrect, please try later! " });
          }
 }
///////////////////REGISTER CLIENT//////////////////
export const registerC = async (req, res) => {
  const {  name,email, phone } = req.body;
  const existingEmail = await Client.findOne({ email });
  const existingPhone = await Client.findOne({ phone });
  if (existingEmail) {
    // Email already exists 
    return res.status(400).json({ message: "Email already exists." });
  }
  if (existingPhone) {
    // Phone already exists 
    return res.status(400).json({ message: "Phone already exists." });
  }
  const code = generateVerificationCode();
  await sendVerificationCode(name,email,code);
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    token:code,
  }); 
  try {
    await client.register();
    res.json({ message: "Client added successfully, waiting for verification!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};
///////////////////LOGIN//////////////////
export const login = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).catch((err) => {
      console.log(err);
  });
  if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
          const token = jwt.sign({ id: user._id, name: user.name },
            'very secret value'
          );
          return res.json({
              success: true,
              message: "Login Successful",
              user: user,
              token: token,
          });
      }
      return res.json({
          token: null,
          user: null,
          success: false,
          message: "Wrong password, please try again",
      });
  }
  return res.json({
      token: null,
      user: null,
      success: false,
      message: "No account found with entered email",
  });
};

 