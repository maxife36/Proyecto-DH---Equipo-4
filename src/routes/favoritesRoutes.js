const express = require("express")
const router = express.Router()

const { favoritesController: controllers } = require("../API-Controllers")

router.get("/allFavorites", controllers.getFavoritesInfo)
router.get("/isFavorite/:productId", controllers.isFavorite)

router.post("/addFavorite", controllers.addFavorite)

router.delete("/deleteFavorite", controllers.deleteFavorite)

module.exports = router