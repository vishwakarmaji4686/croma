const { connection } = require("../config/MysqlConfig");
class BlogModel {
    constructor(){}
    insertBlog(blog){
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO blog (title, description, image, userId) VALUES ('${blog.title}','${blog.description}','${blog.image}','${blog.userId}')`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
    getAllBlog(){
        return new Promise(function (resolve, reject) {
            let query = `select a.*,b.fullName from blog as a left join users as b on b.id = a.userId`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }) 
    }
    getBlogById(id){
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM blog WHERE id='${id}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result[0])
                }
            })
        }) 
    }
    updateaById(id, blog){
        return new Promise(function (resolve, reject) {
            let query = `UPDATE blog SET title='${blog.title}',description='${blog.description}'`
            if(blog.image){
                query+= `,image='${blog.image}' WHERE id='${id}'`
            }else{
                query+= `WHERE id='${id}'`
            }
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }) 
    }
    deleteBlog(id){
        return new Promise(function (resolve, reject) {
            let query = `DELETE FROM blog WHERE id='${id}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result[0])
                }
            })
        })   
    }


}
module.exports = new BlogModel();