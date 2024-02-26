const { DbUser } = require("../database/controllers");

module.exports = async (req, res, next) => {
    if (req.cookies.rememberme && !req.session.loggedUser) {
        const userId = req.cookies.rememberme
        
        const userFinded = await DbUser.getUserById(userId)

        if (userFinded) {           
            req.session.loggedUser = userId
            next()
        }

    } else {
        next()
    }
}