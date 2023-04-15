class CommonService {
    constructor(){}
    uplodeimage(image){
       return new Promise(function (resolve, reject) {
        let img = image.name.split('.').splice(-1)
        let x = Math.random(74185296) * 10 + ('.') + img;
        console.log("x", x)
        let uplodepath = __dirname + "/../public/blogImage/" + x
        image.mv(uplodepath, function(error){
            if(error){
                reject(error)
            }else{
                resolve(x)
            }
        })
       })
    }
}
module.exports = new CommonService();