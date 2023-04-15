const joi = require("joi");
const BlogModel = require("../Model/BlogModel")
const commonService = require("../Service/CommonService")
class BlogController {
    constructor() { }
    async allBlog(req, res) {
        let page = {
            title: "allBlog",
            pageName: "allBlog",
            blog: "",
            isUserLogin: false,
        }
        if(req.session.isUserLogin){
            page.isUserLogin = true;
        }
        let allblog = await BlogModel.getAllBlog()
        console.log("allblog", allblog)
        page.blog = allblog
        res.render('user/template', page)
    }
    async myBlog(req, res) {
        let page = {
            title: "myBlog",
            pageName: "myBlog",
            blog: "",
            isUserLogin: false,
        }
        if(req.session.isUserLogin){
            page.isUserLogin = true;
        }
        let user = req.session.isUserLogin
        let blogs = await BlogModel.getBlogById(user)
        page.blog = blogs; 
        res.render('user/template', page)
    }
    addBlog(req, res) {
        let page = {
            title: "addBlog",
            pageName: "addBlog",
            status: "",
            message: "",
            isUserLogin: false,
        }
        if(req.session.isUserLogin){
            page.isUserLogin = true;
        }
        if (req.session.status && req.session.message) {
            page.status = req.session.status;
            page.message = req.session.message;
            delete req.session.status, req.session.message;
        }
        res.render('user/template', page)
    }
    async insertBlog(req, res) {
        console.log("req.body", req.body)
        console.log(req.files)
        let userId = req.session.isUserLogin
        let blog = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
        })
        let validationRes = blog.validate(req.body);
        if (validationRes && validationRes.error && validationRes.error.details) {
            req.session.status = "error",
                req.session.message = validationRes.error.details[0].message
            res.redirect("/addBlog");
        }
        const title = req.body.title;
        const description = req.body.description;
        let blogD = {
            title: title,
            description: description,
            image: "",
            userId: ""
        }
        blogD.userId = userId
        let allImageNames = []
        if (req.files && req.files.blogImages) {
            let allImage = req.files.blogImages
            if (allImage && allImage.length > 1) {
                for (const singleImage of allImage) {
                    let imageNewName = await commonService.uplodeimage(singleImage)
                    allImageNames.push(imageNewName)
                }
            } else {
                let imageNewName = await commonService.uplodeimage(allImage)
                allImageNames.push(imageNewName)
            }
        }
        let img = allImageNames.toString();
        blogD.image = img
        await BlogModel.insertBlog(blogD)
        res.redirect("/allBlog")
    }
    async editBlog(req, res) {
        let page = {
            title: "editBlog",
            pageName: "editBlog",
            blog: "",
            isUserLogin: false,
        }
        if(req.session.isUserLogin){
            page.isUserLogin = true;
        }
        console.log(req.query) 
        let id = req.query.blogId
        let blogs = await BlogModel.getBlogById(id)
        page.blog = blogs
        res.render('user/template', page)
    }
    async editBlogByUser(req, res){
        console.log("req.body", req.body)
        console.log("req.files", req.files)
        console.log("req.query", req.query )
        let id = req.query.blogId;
        let blog = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
        })
        let validationRes = blog.validate(req.body);
        if (validationRes && validationRes.error && validationRes.error.details) {
            req.session.status = "error",
                req.session.message = validationRes.error.details[0].message
            res.redirect("/editBlog?blogId="+id);
        }
        const title = req.body.title;
        const description = req.body.description;
        let blogD = {
            title: title,
            description: description,
            image: "",
        }
        let allImageNames = []
        if (req.files && req.files.blogImages) {
            let allImage = req.files.blogImages
            if (allImage && allImage.length > 1) {
                for (const singleImage of allImage) {
                    let imageNewName = await commonService.uplodeimage(singleImage)
                    allImageNames.push(imageNewName)
                }
            } else {
                let imageNewName = await commonService.uplodeimage(allImage)
                allImageNames.push(imageNewName)
            }
        }
        let img = allImageNames.toString();
        blogD.image = img
        await BlogModel.updateaById(id,blogD)
        res.redirect("/allBlog")
    }
    async deleteBlog(req, res){
        let id = req.query.blogId;
        await BlogModel.deleteBlog(id)
        res.redirect("/allBlog")
    }
}
module.exports = new BlogController();