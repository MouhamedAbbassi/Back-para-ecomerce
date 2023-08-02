import { forgotPass, resetPass } from '../Services/ForgetPassService.js';


export const forget_password = async(req, res) => {
    const email=req.body.email;
    try {
        forgotPass(req,res,email)
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.messege});
        console.log(error);
    }
}


export const reset_password = async(req, res) => {
    const token = req.query.token;
    try {
        resetPass(req,res,token)
    } catch (error) {
        res.status(400).send({success:false,msg:error.messege});
        console.log(error);
    }
}
