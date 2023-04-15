const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const expresssession = require("express-session")
const fileUpload = require("express-fileupload")
const mainRouter = require('./router/mainRouter');


app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({ extended : false}));
app.use(fileUpload())
app.use(expresssession({
    secret: "mvopdosvknsd",
    resave: false,
    saveUninitialized: false,
}))

app.use('/', mainRouter)

app.listen(3009, function(req, res){
    console.log("server started ap port 3009");
})