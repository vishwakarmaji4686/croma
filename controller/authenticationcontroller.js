const joi = require("joi");
const authenticationModel = require("../Model/authenticationModel")
class authenticationcontroller{
    constructor(){}
    login(req, res){
        try {
            let page ={
                title: "login",
                pageName: "login",
                status: "",
                message: "",
                isUserLogin: false,
            }
            if(req.session.isUserLogin){
                page.isUserLogin = true;
            }
            if(req.session.status && req.session.message){
                page.status = req.session.status;
                page.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            res.render('user/template', page)
        } catch (error) {
            console.log("login page error", error)
        }
    }
    async loginUser(req, res){
    try {
        console.log("req.body", req.body)
        const email = req.body.email;
        const password = req.body.password;
        let user  = await authenticationModel.getUserByemail(email)
        console.log("user", user)
        if(user && user.length > 0){
            let userInfo = user[0];
            if(userInfo.password = password){
                req.session.isUserLogin = userInfo.id
                res.redirect("/")
            }else{
                req.session.status = "error",
                req.session.message = "Wrong Password ::::::::::"
                res.redirect("/login")
            }
        }else{
            req.session.status = "error",
            req.session.message = "Wrong email ::::::::::"
            res.redirect("/login")
        }

    } catch (error) {
        console.log("login user error", error)
    }   
 }

    singUp(req, res){
       try {
        let page ={
            title: "singUp",
            pageName: "singUp",
            status: "",
            message: "",
            isUserLogin: false,
        }
        if(req.session.isUserLogin){
            page.isUserLogin = true;
        }
        if (req.session.status && req.session.message) {
            page.status = req.session.status,
            page.message = req.session.message
            delete req.session.status, req.session.message
        };
        res.render('user/template', page)
       } catch (error) {
            console.log("singUp error" , error)
       }
    }
    async singUpUser(req, res){
        try {
            console.log("req.body",req.body)
        let user = joi.object({
            fullName: joi.string().required(),
            email: joi.string().required(),
            Contact: joi.number().required(),
            password: joi.string().required(),
        })
        let validationRes = user.validate(req.body);
        if(validationRes && validationRes.error && validationRes.error.details){
            req.session.status = "error",
            req.session.message = validationRes.error.details[0].message
            res.redirect("/singUp");
        }
        const fullName = req.body.fullName;
        const email = req.body.email;
        const contact = req.body.Contact;
        const password = req.body.password;
        let userD = {
            fullName: fullName,
            email: email,
            contact: contact,
            password: password,
        }
        await authenticationModel.insertUser(userD)
        res.redirect("/login")
        } catch (error) {
            console.log("sing User error", error)
        }
    }
}
module.exports = new authenticationcontroller();