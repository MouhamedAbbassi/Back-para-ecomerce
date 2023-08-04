import Client from "../Models/Client.js";
 import { loginUser,sendVerificationCode } from "../Services/AuthService.js";
 
 
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
export const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("username",email);
  console.log("password",password);

  loginUser(email, password)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

 