const express = require("express")
const path = require("path")

const app = express()

const pathPublic = path.resolve("public")

app.use(express.static(pathPublic))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname, 'views'))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname, 'views'))

const port = process.env.PORT || 3001

//---Paths---
//const pathLogin = path.resolve("views", "login.ejs") 
//const pathProductCart = path.resolve("views", "productCart.ejs") 
//const pathProductDetail = path.resolve("views", "productDetail.ejs") 
//const pathRegister = path.resolve("views", "register.ejs") 
//const pathDkmGeneralController = path.resolve("js", "dkm-general-controller.js") 
//const pathDkmProductDetailController = path.resolve("js", "dkm-product-detail-controller.js") 
//const pathSubmenuController = path.resolve("js", "sub-menu-controller.js") 
//const pathFormsController = path.resolve("js", "register-form-controller.js") 



//  routes 

// index

const indexRoutes = require('./routes/index.routes.js');
//login 

const loginRoutes = require('./routes/login.routes.js');
//product-cart

const productCartRoutes = require('./routes/product-cart.routes.js');
//product-detail

const productDetailRoutes = require('./routes/producto-detail.routes.js')
//register 

const productEditRoutes = require("./routes/product-edit.routes.js")

const registerRoutes = require('./routes/register.routes.js')
//darkMode

const darkModeRoutes = require('./routes/darkmode.routes.js')
//subMenu

const subMenuRoutes = require('./routes/submenu.routes.js')

//form 

const formRegisterRoutes = require('./routes/form.routes.js')

//  Mostrar rutas
app.use('/',indexRoutes)
app.use('/',loginRoutes);
app.use('/',productCartRoutes);
app.use('/',productDetailRoutes);
app.use('/',registerRoutes);
app.use('/',productEditRoutes);
app.use(darkModeRoutes)
app.use(subMenuRoutes)
app.use(formRegisterRoutes);



//----Peticiones CRUD----


// app.get("/", (req,res) => res.render(pathIndex))
// app.get("/login", (req,res) => res.render(pathLogin))
//app.get("/product-cart", (req,res) => res.render(pathProductCart))
//app.get("/product-detail", (req,res) => res.render(pathProductDetail))
//app.get("/register", (req,res) => res.render(pathRegister))
//app.get("/darkmode-controller", (req,res) => res.sendFile(pathDkmGeneralController))
//app.get("/darkmode-ptodcut-detail-controller", (req,res) => res.sendFile(pathDkmProductDetailController))
//app.get("/submenu-controller", (req,res) => res.sendFile(pathSubmenuController))
//app.get("/forms-controller", (req,res) => res.sendFile(pathFormsController))


app.listen(port, () =>{
    console.log(`Se conecto Correctamnete a 
    http://localhost:${port}`);
})