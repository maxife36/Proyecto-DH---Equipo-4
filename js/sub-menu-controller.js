const allMenuTitles = document.querySelectorAll(".menu-title") 
const headerNav = document.querySelector(".header-nav") 

const subMenuController = (menuTitle) =>{
    allMenuTitles.forEach(el =>{
        const elStatus = el.attributes.status.value
        const elSubmenu = el.nextElementSibling

        if (el === menuTitle) {
            if (elStatus === "true") {
                elSubmenu.style.display ="none"
                el.attributes.status.value ="false"
            }else{
                elSubmenu.style.display ="flex"
                el.attributes.status.value = "true"
            } 
        }else{
            elSubmenu.style.display ="none"
            el.attributes.status.value = "false"
        }
    })
}

document.addEventListener("click", (event)=>{

    if (!headerNav.contains(event.target)) {

        allMenuTitles.forEach(el =>{
            const elSubmenu = el.nextElementSibling
            elSubmenu.style.display ="none"
            el.attributes.status.value = "false"
        })     
          
    }
})

/* ------------------------ */

const entryOptions = document.querySelector(".entry-options")
const exitBtn = document.querySelector("#btn-exit-entry")
const loginIcon = document.querySelector(".login-icon")

let btnState = false

exitBtn.addEventListener("click", ()=> entryOptions.style.display = "none")

loginIcon.addEventListener("click", ()=>  entryOptions.style.display = "flex")

/* ------------------------ */

const cartIcon = document.querySelector(".cart-icon")

cartIcon.addEventListener("click", ()=>{
    window.location.href = "/product-cart"
})


