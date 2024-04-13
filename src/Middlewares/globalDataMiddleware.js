const { DbCategory } = require("../database/controllers");

let allCategories = null
let firstChargeFlag = false

const whatsappDefaultText = "Hola Gotec 🙋🏽, me gustaria realizar una consulta."
const whatsappContactNumber = "+543815978612"
let showCategories = ["Laptops", "Monitores", "Periféricos", "Ofertas"]

//Verificacion de las Categorias solicitadas
async function verificacion() {
    try {
        allCategories = await DbCategory.getAllCategories()

        const categoriesTitles = allCategories.map(categoryObj => categoryObj.categoryTitle)

        showCategories.forEach(category => {
            if (!categoriesTitles.includes(category)) throw new Error(`La categoria ${category}, no se encuentra en la DB`)
        })

        showCategories = allCategories.filter(categoryObj => showCategories.includes(categoryObj.categoryTitle))

    } catch (err) {
        console.log(err.message)
        throw err.message
    }
}


module.exports = async (req, res, next) => {
    try {
        // carga unica de las variables showCategories y allCategories
        if (!firstChargeFlag) {
            await verificacion()
            firstChargeFlag = true
        }
        
        res.locals.cartProducts = req.session.cartProducts

        res.locals.globalData = {
            whatsappContactNumber,
            whatsappDefaultText: encodeURIComponent(whatsappDefaultText),
            showCategories,
            allCategories,
            profileImg: req.session.profileImg? req.session.profileImg : null
        };
        
        next();
    } catch (err) {
        console.log(err.message)
    }
}
