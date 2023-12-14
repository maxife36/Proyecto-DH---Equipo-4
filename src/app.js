const express = require("express")
const path = require("path")

const app = express()

const pathPublic = path.resolve("public")

app.use(express.static(pathPublic))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname, 'views'))

const port = process.env.PORT || 3001


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
app.use('/',darkModeRoutes)
app.use('/',subMenuRoutes)
app.use('/',formRegisterRoutes);



app.listen(port, () =>{
    console.log(`Se conecto Correctamnete a 
    http://localhost:${port}`);
})