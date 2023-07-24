import Fournisseurs from "../Models/Fournisseurs.js";
import Client from "../Models/Client.js";

 
import { loginUser } from "../Services/AuthService.js";

///////////////////REGISTER CLIENT//////////////////
export const registerC = (req, res) => {
  const { name, email, password, phone } = req.body;
  const client = new Client({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });
  client.register()
    .then(savedClient => {
      res.json({ message: "Client added successfully!", savedClient });
    })
    .catch(error => {
      res.json({ message: "An error occurred", error });
    });
};

///////////////////REGISTER FOURNISSEUR//////////////////
export const registerF = (req, res) => {
  const { name, email, password, phone } = req.body;
  const fournisseur = new Fournisseurs({
    name: name,
    email: email,
    password: password,
    phone: phone,
  });

  fournisseur.register()
    .then(savedFournisseur => {
      res.json({ message: "Fournisseur added successfully!", savedFournisseur });
    })
    .catch(error => {
      res.json({ message: "An error occurred", error });
    });
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