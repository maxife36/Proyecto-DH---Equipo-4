/* ---Modulos Nativos y de Terceros--- */
const express = require("express")
const path = require("path")
const methodOverride = require("method-override")


/* ---Modulos Internos--- */

const internalRoutes = require("./routes/internalRoutes.js")
const mainRoutes = require("./routes/mainRoutes.js")
const productsRoutes = require("./routes/productsRoutes.js")
const usersRoutes = require("./routes/usersRoutes.js")



/* ---Variables de Configuracion--- */

const port = process.env.PORT || 3000

const app = express()

const pathPublic = path.resolve("public")
const pathViews = path.resolve("src", "views")



/* ---Pre Configuraciones de Express y Middlewares--- */


app.set('view engine', 'ejs')
app.set('views', pathViews)

app.use(express.static(pathPublic))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))

/* ---Rutas Principales de Express--- */

app.use("/DOM-Controllers", internalRoutes)
app.use("/", mainRoutes)
app.use("/products", productsRoutes)
app.use("/users", usersRoutes)



app.listen(port, () => {
    console.log(`Se conecto Correctamnete a 
    http://localhost:${port}`);
})