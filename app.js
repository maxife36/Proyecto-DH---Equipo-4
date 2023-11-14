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
const pathDkmGeneralController = path.resolve("js", "dkm-general-controller.js") 
const pathDkmProductDetailController = path.resolve("js", "dkm-product-detail-controller.js") 
const pathSubmenuController = path.resolve("js", "sub-menu-controller.js") 


//----Peticiones CRUD----

app.get("/", (req,res) => res.sendFile(pathIndex))
app.get("/login", (req,res) => res.sendFile(pathLogin))
app.get("/product-cart", (req,res) => res.sendFile(pathProductCart))
app.get("/product-detail", (req,res) => res.sendFile(pathProductDetail))
app.get("/register", (req,res) => res.sendFile(pathRegister))
app.get("/darkmode-controller", (req,res) => res.sendFile(pathDkmGeneralController))
app.get("/darkmode-ptodcut-detail-controller", (req,res) => res.sendFile(pathDkmProductDetailController))
app.get("/submenu-controller", (req,res) => res.sendFile(pathSubmenuController))


app.listen(PORT, () =>{
    console.log(`Se conecto Correctamnete a 
    http://localhost:${PORT}`);
})