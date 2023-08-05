import User from "./User.js";

class Client extends User {
  constructor(name, email, password, phone) {
    super(name, email, password, phone);
    this.role = "client";
    this.age = 0;
    this.address = null;
    this.gender = null;
    this.isEmailVerified = false;
  }

}

export default Client ;
