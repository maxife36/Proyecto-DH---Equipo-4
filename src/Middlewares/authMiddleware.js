const { DbUser } = require("../database/controllers");

module.exports = async (req, res, next) => {
   if (req.session.loggedUser) {
      const user = await DbUser.getUserById(req.session.loggedUser)
      //Si no existe te redirige al home
      if (!user) return res.redirect("/users/login")
   //Si es un usuario valido continua la ejecucion
   next()
} else {
      res.redirect("/users/login")
   }
}