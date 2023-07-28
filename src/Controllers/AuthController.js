import Client from "../Models/Client.js";
 import { loginUser,sendVerificationCode } from "../Services/AuthService.js";
 
 
///////////////////GENERATION OF CODE CONFIRMATION //////////////////
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

///////////////////  CONFIRMATION //////////////////
async function VerificationCode(req,res,client) {

  if(req.body.code===client.token){
    await client.register()
    .then(savedClient => {
      res.json({ message: "Client added successfully!", savedClient });})
    .catch(error => {
      res.json({ message: "An error occurred", error });});

  }
 }
///////////////////REGISTER CLIENT//////////////////

export const registerC = async (req, res) => {
  const {  name,email, phone } = req.body;
  const existingEmail = await Client.findOne({ email });
  const existingPhone = await Client.findOne({ phone });
  if (existingEmail) {
    // Email already exists, return an error
    return res.status(400).json({ message: 'Email already exists.' });
  }
  if (existingPhone) {
    // Phone already exists, return an error
    return res.status(400).json({ message: 'Phone already exists.' });
  }
  const code = generateVerificationCode();
  await sendVerificationCode(name,email,code,res);
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    token:code,
  });
  await VerificationCode(req,res,client);
 

};
///////////////////LOGIN//////////////////
export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  loginUser(username, password)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};