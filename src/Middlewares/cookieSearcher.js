const { DbUser } = require("../database/controllers");
const { updateCartInfoToRender } = require("../API-Controllers/cartController");
const { updateFavoriteCookieInfo } = require("../API-Controllers/favoritesController");

module.exports = async (req, res, next) => {
    if (req.cookies.rememberme && !req.session.loggedUser) {
        const userId = req.cookies.rememberme
        
        const userFinded = await DbUser.getUserById(userId)

        if (userFinded) {           
            req.session.loggedUser = userId
            req.session.loggedCart = userFinded.cart.cartId
            
            res.cookie("isLogged", true)
            await updateCartInfoToRender(userId, req, res)
            await updateFavoriteCookieInfo(userId, req, res)

            next()
        }

    } else {
        next()
    }
}