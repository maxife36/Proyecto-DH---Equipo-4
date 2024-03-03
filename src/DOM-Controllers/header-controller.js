window.addEventListener("load", function(){
    
const loginAnchor = document.querySelector(".login-icon")
const userProfile = document.querySelector(".user-icon-container")

const cookie = document.cookie.split(";")

const isLoggedCookie = []

cookie.forEach(cookie => {
    if(cookie.includes("isLogged")) isLoggedCookie.push(cookie)
})

const valorCookie = Boolean(isLoggedCookie[0].split("isLogged=")[1])
    
console.log(valorCookie);
})