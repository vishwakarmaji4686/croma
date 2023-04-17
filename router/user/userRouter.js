const express = require("express");
const app = express();
const authenticationcontroller = require("../../controller/authenticationcontroller");
const BlogController = require("../../controller/BlogController")
app.get('/', function(req, res){
   try {
    let page ={
        title: "home",
        pageName: "home",
        isUserLogin: false,
    }
    if(req.session.isUserLogin){
        page.isUserLogin = true;
    }
    res.render('user/template', page)
   } catch (error) {
    console.log("home page error", error)
   }
});
app.get('/login', authenticationcontroller.login);
app.post('/login', authenticationcontroller.loginUser);
app.get('/singUp',authenticationcontroller.singUp);
app.post('/singUp',authenticationcontroller.singUpUser);
app.get('/myBlog', BlogController.myBlog);

app.get('/allBlog',BlogController.allBlog);
app.get('/addBlog', BlogController.addBlog);
app.post('/addBlog', BlogController.insertBlog);
app.get('/editBlog', BlogController.editBlog);
app.post('/editBlog', BlogController.editBlogByUser);
app.get('/deleteBlog', BlogController.deleteBlog);

module.exports = app;