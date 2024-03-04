
    
const loginAnchor = document.querySelector(".login-icon")
const userProfile = document.querySelector(".user-icon-container")
const heartIcon = document.querySelector("#heartIcon")
const cartIcon = document.querySelector(".cart-icon")



/* Obtencion del valor de la cookie isLogged */
const cookie = document.cookie.split(";")
const isLoggedCookie = []

cookie.forEach(cookie => {
    if(cookie.includes("isLogged")) isLoggedCookie.push(cookie)
})

const valorCookie = Boolean(isLoggedCookie[0].split("isLogged=")[1])
 
/*Controlador de elemento DOM para usuarios logeados  */

if(valorCookie){
    loginAnchor.style.display = "none"
    userProfile.style.display = "flex"
    heartIcon.style.display = "flex"
    cartIcon.style.display = "flex"
   
}

userProfile.addEventListener("click", function(){
    window.location.href = "/users/profile"
})
