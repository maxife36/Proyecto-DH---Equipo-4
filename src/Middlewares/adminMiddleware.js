const { DbUser } = require("../database/controllers");

module.exports = async (req, res, next) => {
   if (req.session.loggedUser) {
      const user = await DbUser.getUserById(req.session.loggedUser)

      //Si no existe te redirige al login
      if (!user) return res.redirect("/users/login")
      
      //Si no es Admin te redirige al Home
      if (!user.admin) return res.redirect("/")

      //Si el usuario es Admin continua la ejecucion
      next()
   } else {
      res.redirect("/users/login")
   }
}