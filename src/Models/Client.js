import  User from "./User.js";
 
class Client extends User {

/////////////////Constructor//////////////
  constructor(name, email, password, phone) {

     super(name, email, password, phone); 
     this.role = "client";
     this.age = 0;
     this.address = null;
     this.gender = null;
     this.isEmailVerified=false;
    }

/////////////////FUNCTION/////////////////

 

  ///////////////////////////////////////// 
}

export default Client;