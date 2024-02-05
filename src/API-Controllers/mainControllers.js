const path = require("path");
const fs = require("fs");
const userModels = require("../models/usersModels") //Migrar a userControllers
const bcrypt = require("bcrypt")
const session = require("express-session")

const productsDbJSON = fs.readFileSync(path.join(__dirname, "..", "temporary-DB", "products-DB.json"), "utf-8")
const productsDb = JSON.parse(productsDbJSON)


const controllers = {
    index: (req, res) => res.render("index.ejs", { productsDb }),
    login: (req, res) => res.render("login.ejs"),
    register: (req, res) => res.render("register.ejs"),
    loginUser: (req, res) => {
        const { remembermeBtn, userName, password } = req.body

        const userFinded = userModels.findByParams("email", userName)

        if (userFinded) {            
            const validPassword = bcrypt.compareSync(password, userFinded[0].password)
            
            if(validPassword){
                req.session.loggedUser = userFinded[0].id
                if (remembermeBtn) {
                    res.cookie("rememberme", userName, { maxAge: (60 * 1000 * 60 * 24) })
                }
                return res.redirect("/")
            }
        }

        res.redirect("/login")
    }

}


module.exports = controllers;