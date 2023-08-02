 import  User from "./User.js";
 
class Fournisseur extends User {
/////////////////Constructor//////////////
constructor(name, email, password, phone) {

  super(name, email, password, phone); 
  this.role = "fournisseur";
}


/////////////////FUNCTION/////////////////

 /////////////////////////////////////////

}

export default  Fournisseur;