const loginIcon = document.querySelector(".login-icon")
const userProfile = document.querySelector(".user-icon-container")
const heartIcon = document.querySelector("#heartIcon")
const cartIcon = document.querySelector(".cart-icon")
const entryOptions = document.querySelector(".entry-options")
const exitBtn = document.querySelector("#btn-exit-entry")


/* Obtencion del valor de la cookie isLogged */

const cookies = document.cookie
let  valorCookie = null

if (cookies) {
    const cookie = document.cookie.split(";")
    const isLoggedCookie = []
    
    cookie.forEach(cookie => {
        if(cookie.includes("isLogged")) isLoggedCookie.push(cookie)
    })
    if (isLoggedCookie.length) {
        valorCookie = Boolean(isLoggedCookie[0].split("isLogged=")[1])
    }
}
/*Controlador de elemento DOM para usuarios logeados  */

if(valorCookie){
    loginIcon.style.display = "none"
    userProfile.style.display = "flex"
    heartIcon.style.display = "flex"
    cartIcon.style.display = "flex"
}

userProfile.addEventListener("click", function(){
    window.location.href = "/users/profile"
})

/* --------Controladores de Opciones de Usuario----- */



// let btnState = false

exitBtn.addEventListener("click", ()=> entryOptions.style.display = "none")

loginIcon.addEventListener("click", ()=>  entryOptions.style.display = "flex")

