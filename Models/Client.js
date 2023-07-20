const { User, UserClass } = require('./User');
const bcrypt = require('bcrypt');

class Client extends User {
  constructor(name, email, password, phone) {
    super(name, email, password, phone);  
  }

/////////////////////////////////////////////////////////////
///////////////////////////FUNCTION//////////////////////////
/////////////////////////////////////////////////////////////
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

module.exports = Client;