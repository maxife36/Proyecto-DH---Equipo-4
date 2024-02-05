/* ---Modulos Nativos y de Terceros--- */
const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")

/* ---Modulos Internos--- */

const internalRoutes = require("./routes/internalRoutes.js")
const mainRoutes = require("./routes/mainRoutes.js")
const productsRoutes = require("./routes/productsRoutes.js")
const usersRoutes = require("./routes/usersRoutes.js")
const cookieSearcher = require("./Middlewares/cookieSearcher.js")

//PRUEBA -- ELIMINAR DESPUES DE USO
const pruebaRoutes = require("./routes/prueba.js")

/* ---Variables de Configuracion--- */

const port = process.env.PORT || 3000

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

//Permite utilizacion de otros metodos en los forms del html
app.use(methodOverride("_method"))

app.use(session({secret:"gotec-DH", resave: false, saveUninitialized: false}))
app.use(cookieParser())
app.use(cookieSearcher)


/* ---Rutas Principales de Express--- */

app.use("/DOM-Controllers", internalRoutes)
app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)

//PRUEBA -- ELIMINAR DESPUES DE USO
app.use("/prueba", pruebaRoutes)


app.listen(port, () => {
    console.log(`Se conecto Correctamnete a 
    http://localhost:${port}`);
})