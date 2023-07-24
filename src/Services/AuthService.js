import  userSchema  from "../Models/User.js";
 import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 //////////////////////// LOGIN //////////////////////////
async function loginUser(username, password) {
  try {
    const user = await userSchema.findOne({ $or: [{ email: username }, { phone: username }] });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ name: user.name }, "very secret value", { expiresIn: "1h" });
        return { message: "Login successfully!", token };
      } else {
        return { message: "Password does not match" };
      }
    } else {
      return { message: "No user found!" };
    }
  } catch (err) {
    console.log(err);
    return { message: err };
  }
}
export { loginUser };
