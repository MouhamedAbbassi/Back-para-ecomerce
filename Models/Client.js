import bcrypt from 'bcrypt';
import  User  from './User.js';

class Client extends User {
  constructor(name, email, password, phone) {
    super(name, email, password, phone);  
  }

  /////////////////////////////////////////////////////////////////
  ///////////////////////////FUNCTION//////////////////////////
  /////////////////////////////////////////////////////////////////
  async register() {
    try {
      const hashedPass = await bcrypt.hash(this.password, 10);
      this.password = hashedPass;
      this.role = "client";
      return await this.save();
    } catch (error) {
      throw error;
    }
  }
}

export default Client;