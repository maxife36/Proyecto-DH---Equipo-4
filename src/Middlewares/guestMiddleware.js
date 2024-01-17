module.exports = (req,res, next) => {
    if(!req.session.loggedUser){
       next()
    }else{
        res.redirect("/")
    }
}