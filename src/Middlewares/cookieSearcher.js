module.exports = (req,res,next) => {
    if(req.cookies.rememberme && !req.session.loggedUser){

        //copiar codigo de verificacion del proceso del login
        
        req.session.loggedUser = req.cookies.rememberme
        next()
    }else{
        next()
    }
}