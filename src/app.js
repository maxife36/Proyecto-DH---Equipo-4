/* ---Modulos Nativos y de Terceros--- */
require('dotenv').config()
const cors = require('cors');

const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")

/* ---Modulos Internos--- */
const {cookieSearcher, adminMiddleware , globalDataMiddleware} = require("./Middlewares")
const {internalRoutes, mainRoutes , productsRoutes, usersRoutes, cartRoutes, adminRoutes, mpPaymentRoutes, sendGridRoutes, favoritesRoutes, reactAPIRoutes} = require("./routes")

/* ---Variables de Configuracion--- */

const PORT = process.env.PORT || 3000

//Instancia de express
const app = express()

const pathPublic = path.resolve("public")
const pathViews = path.resolve("src", "views")

/* ---Pre Configuraciones de Express y Middlewares--- */


app.set("view engine", "ejs")
app.set("views", pathViews)

app.use(express.static(pathPublic))

//Permite leer formatos enviados por forms
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Habilitar CORS para todas las solicitudes
app.use(cors());

//Permite utilizacion de otros metodos en los forms del html
app.use(methodOverride("_method"))
app.use(session({secret:"gotec-DH", resave: false, saveUninitialized: false}))
app.use(cookieParser())
app.use(cookieSearcher)
app.use(globalDataMiddleware)


/* ---Rutas Principales de Express--- */

app.use("/DOM-Controllers", internalRoutes)
app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)
app.use("/cart", cartRoutes)
app.use("/favorites", favoritesRoutes)
app.use("/admin", adminMiddleware, adminRoutes)
app.use("/mercadopago", mpPaymentRoutes)
app.use("/mail-service", sendGridRoutes)
app.use("/api", reactAPIRoutes)
app.use("*", (req,res) => {
    res.render("notFound")
})


app.listen(PORT, () => {
    console.log(`Se conecto Correctamnete a 
    http://localhost:${PORT}`);
})