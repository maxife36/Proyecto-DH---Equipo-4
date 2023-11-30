const express = require("express")
const path = require("path")

const app = express()

const pathPublic = path.resolve("public")

app.use(express.static(pathPublic))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname, 'views'))

const PORT = 3001

//---Paths---

const pathIndex = path.resolve("views", "index.ejs") 
const pathLogin = path.resolve("views", "login.ejs") 
const pathProductCart = path.resolve("views", "productCart.ejs") 
const pathProductDetail = path.resolve("views", "productDetail.ejs") 
const pathRegister = path.resolve("views", "register.ejs") 
const pathDkmGeneralController = path.resolve("js", "dkm-general-controller.js") 
const pathDkmProductDetailController = path.resolve("js", "dkm-product-detail-controller.js") 
const pathSubmenuController = path.resolve("js", "sub-menu-controller.js") 


//----Peticiones CRUD----

app.get("/", (req,res) => res.render(pathIndex))
app.get("/login", (req,res) => res.render(pathLogin))
app.get("/product-cart", (req,res) => res.render(pathProductCart))
app.get("/product-detail", (req,res) => res.render(pathProductDetail))
app.get("/register", (req,res) => res.render(pathRegister))
app.get("/darkmode-controller", (req,res) => res.sendFile(pathDkmGeneralController))
app.get("/darkmode-ptodcut-detail-controller", (req,res) => res.sendFile(pathDkmProductDetailController))
app.get("/submenu-controller", (req,res) => res.sendFile(pathSubmenuController))


app.listen(PORT, () =>{
    console.log(`Se conecto Correctamnete a 
    http://localhost:${PORT}`);
})