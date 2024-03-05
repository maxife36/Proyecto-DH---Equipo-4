const { DbCategory, DbFeature } = require("../controllers");

module.exports = async function extraccionData(){
    const features = {}
    const categories = {}

    const dbFeatures = await DbFeature.getAllFeatures()
    const dbCategories = await DbCategory.getAllCategories()

    function normalize (title, id, saveObj){
        // normalize reemplaza las tildes y en el replace remplaza por las letras sin tile y aparte elimina espacios
        const objTitle = title.normalize("NFD").replace(/[\u0300-\u036f\s]/g, "")
        saveObj[objTitle] = id
    }

    dbFeatures.forEach(feature => {
        normalize(feature.featureName, feature.featureId, features)
    });
    dbCategories.forEach(category => {
        normalize(category.categoryTitle, category.categoryId, categories)
    });

    return {
        features, 
        categories
    }
}
