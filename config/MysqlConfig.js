const mysql = require("mysql")
connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "corma"
})
connection.connect(function(error){
    if(error){
        console.log("unable to connect detabase:::::")
    }else{
        console.log("detabase conneect :::::::")
    }
});
module.exports.connection = connection;