const { DbCategory } = require("../database/controllers");

let allCategories = null

const whatsappDefaultText = "Hola Gotec 🙋🏽, me gustaria realizar una consulta."
const whatsappContactNumber = "+543855991428"
const showCategories = ["Laptops", "Monitores", "Periféricos", "Ofertas"]
let filteredCategories = null

//Verificacion de las Categorias solicitadas
async function verificacion() {
    try {
        allCategories = await DbCategory.getAllCategories()

        const categoriesTitles = allCategories.map(categoryObj => categoryObj.categoryTitle)

        showCategories.forEach(category => {
            if (!categoriesTitles.includes(category)) throw new Error(`La categoria ${category}, no se encuentra en la DB`)
        })

        return allCategories.filter(categoryObj => showCategories.includes(categoryObj.categoryTitle))      
        
    } catch (err) {
        console.log(err.message)
        throw err.message
    }
}


module.exports = async (req, res, next) => {
    const showCategories = await verificacion()

    res.locals.globalData = {
        whatsappContactNumber,
        whatsappDefaultText: encodeURIComponent(whatsappDefaultText),
        showCategories,
        allCategories
    };

    next();
}
