import  userSchema  from '../Models/User.js';
import  config  from '../config/config.js';

import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

const  sendResetPasswordMail = async(name, email, token)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });

        const mailOptions={
            from:config.emailUser,
            to:email,
            subject:'for reset passwoerd',
            html:'<p> hii '+name+' , please copy the link and <a href="http://127.0.0.1:3001/api/reset-password?token='+token+'"> and reset your password</a>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error);
            } else {
                console.log("za3maaaaa");
                console.log("mail has been sent:- ", info.response);
                console.log("offff menek");
            }
        });

    } catch (error) {
        res.status(400).send({success:false,msg:error.messege});
    }
}

export const forget_password = async(req, res) => {
    try {
        const email=req.body.email;
        const userdata = await userSchema.findOne({email:email});

        if (userdata) {
            const randomString = randomstring.generate();
            const data = await userSchema.updateOne({email:email},{$set:{token:randomString}});
            sendResetPasswordMail(userdata.name,userdata.email,randomString);
            res.status(200).send({success:true,msg:"please check your inbox of mail."});

        } else {
            res.status(200).send({success:true,msg:"this email does not exist."});
        }
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.messege});
        console.log(error);
    }
}
