import Client from "../Models/Client.js";
 import { loginUser,sendVerificationCode } from "../Services/AuthService.js";
 
 
///////////////////GENERATION OF CODE CONFIRMATION //////////////////
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

///////////////////  CONFIRMATION //////////////////
export async function VerificationCode(req,res) {
  
 
 
    const email="mouhamed.abbassi@esprit.tn";

    // Find the client by their email and verificationCode
    const client = await Client.findOne({ email });
    console.log(client);
 
         console.log(req.body.code);
 
         if(req.body.code===client.token){
          client.isEmailVerified = true;
     
          
          await client.register()
          .then(savedClient => {
            res.json({ message: "Client added successfully!", savedClient });})
          .catch(error => {
            res.json({ message: "An error occurred", error });});
          }else{
            await Client.deleteOne({ email });

            res.json({ message: "code incorrect try later " });


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
  console.log(code);
  await sendVerificationCode(name,email,code);
  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    token:code,
      
  });
  
  await client.register()
  .then(savedClient => {
    res.json({ message: "Client added successfully!", savedClient });})
  .catch(error => {
    res.json({ message: "An error occurred", error });});

 

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