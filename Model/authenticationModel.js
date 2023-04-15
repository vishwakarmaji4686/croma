const { connection } = require("../config/MysqlConfig");

class authenticationModel{
    constructor(){}
    insertUser(user){
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO users (fullName, email, contact, password) VALUES ('${user.fullName}','${user.email}','${user.contact}','${user.password}')`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
    getUserByemail(email){
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM users WHERE email='${email}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
}
module.exports = new authenticationModel();