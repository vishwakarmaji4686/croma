const express = require("express");
const app = express();
const authenticationcontroller = require("../../controller/authenticationcontroller");
const BlogController = require("../../controller/BlogController")
app.get('/', function(req, res){
    let page ={
        title: "home",
        pageName: "home",
        isUserLogin: false,
    }
    if(req.session.isUserLogin){
        page.isUserLogin = true;
    }
    res.render('user/template', page)
});
app.get('/login', authenticationcontroller.login);
app.post('/login', authenticationcontroller.loginUser);
app.get('/singUp',authenticationcontroller.singUp);
app.post('/singUp',authenticationcontroller.singUpUser);

app.get('/allBlog',BlogController.allBlog);
app.get('/myBlog', BlogController.myBlog);
app.get('/addBlog', BlogController.addBlog);
app.post('/addBlog', BlogController.insertBlog);
app.get('/editBlog', BlogController.editBlog);
app.post('/editBlog', BlogController.editBlogByUser);
app.get('/deleteBlog', BlogController.deleteBlog);

module.exports = app;