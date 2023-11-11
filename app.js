const express = require("express")
const path = require("path")

const app = express()

const pathPublic = path.resolve("public")

app.use(express.static(pathPublic))

const PORT = 3001

//---Paths---

const pathIndex = path.resolve("views", "index.html") 
const pathLogin = path.resolve("views", "login.html") 
const pathProductCart = path.resolve("views", "productCart.html") 
const pathProductDetail = path.resolve("views", "productDetail.html") 
const pathRegister = path.resolve("views", "register.html") 
const pathDarckmodeController = path.resolve("js", "dark-mode-controller.js") 


//----Peticiones CRUD----

app.get("/", (req,res) => res.sendFile(pathIndex))
app.get("/login", (req,res) => res.sendFile(pathLogin))
app.get("/product-cart", (req,res) => res.sendFile(pathProductCart))
app.get("/product-detail", (req,res) => res.sendFile(pathProductDetail))
app.get("/register", (req,res) => res.sendFile(pathRegister))
app.get("/darkmode-controller", (req,res) => res.sendFile(pathDarckmodeController))


app.listen(PORT, () =>{
    console.log(`Se conecto Correctamnete a 
    http://localhost:${PORT}`);
})