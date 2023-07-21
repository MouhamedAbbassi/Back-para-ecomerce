import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validators from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
     required: true,
      validate: [
      { validator: validators.isEmail, msg: 'Invalid email' } ]
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
  },
   image: { 
    type: String,
  },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

class User {
  constructor(name, email, password, phone,image) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = null;
    this.image = image;
  }

  async register() {
    try {
      const hashedPass = await bcrypt.hash(this.password, 10);
      this.password = hashedPass;
      return await this.save();
    } catch (error) {
      throw error;
    }
  }
}

export default mongoose.model('userSchema', userSchema)
