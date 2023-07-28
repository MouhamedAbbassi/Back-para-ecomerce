import  userSchema  from '../Models/Uthis email does not exist.ser.js';
import  config  from '../config/config.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

//forget password
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
            html:'<p> hii '+name+' , please copy the link and <a href="http://127.0.0.1:3001/api/auth/resetpassword?token='+token+'"> and reset your password</a>'
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






async function forgotPass(req,res,email) {
    
    const userdata = await userSchema.findOne({email:email});

        if (userdata) {
            const randomString = randomstring.generate();
            const data = await userSchema.updateOne({email:email},{$set:{token:randomString}});
            sendResetPasswordMail(userdata.name,userdata.email,randomString);
            res.status(200).send({success:true,msg:"please check your inbox of mail."});

        } else {
            res.status(200).send({success:true,msg:""});
        }
        
    
}

// reset passsword

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
        
    } catch (error) {
        //res.status(400).send(error.messege);
        console.log(error);

    }
}

async function resetPass(req,res,token) {
    
        const tokenData = userSchema.findOne({ token:token });
        if (tokenData) {
            const password = req.body.password;
            const newPassword = await securePassword(password);
            const userData = await userSchema.findOneAndUpdate({token:token},{$set:{password:newPassword,token:''}},{new:true});
            res.status(200).send({success:true,msg:"user password has been reset. ",data:userData});

        } else {
            res.status(200).send({success:true,msg:"this link has been expired. "});
        }
}


export { forgotPass, resetPass };