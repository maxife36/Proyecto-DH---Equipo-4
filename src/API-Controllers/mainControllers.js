const path = require('path');
const fs = require("fs");


const productsDbJSON = fs.readFileSync(path.join(__dirname, "..", "temporary-DB", "products-DB.json"), "utf-8")
const productsDb = JSON.parse(productsDbJSON)


const controllers = {
    index: (req,res) => res.render("index.ejs", {productsDb}),
    login: (req,res) => res.render("login.ejs"),
    register: (req,res) => res.render("register.ejs"),
    loginUser: (req, res) => {
        const {remembermeBtn, userName, password} = req.body

        if(remembermeBtn){
            res.cookie("rememberme" , userName, {maxAge : (60 * 1000 * 60 * 24)})
        }
 
        res.redirect("/")
    }
/*     prueba: (req,res) =>{
        console.log("Estoy en prueba"); 
        req.session.usuarioLogueado = req.params.nombre
        res.redirect("/")
    } */
}


module.exports = controllers;