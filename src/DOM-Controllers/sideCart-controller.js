/*cartIcon ya viene declarado de header-controller*/
// const cartIcon = document.querySelector(".cart-icon")

const sideCartContainer = document.querySelector(".sideCart-container")
const sideCartBackground = document.querySelector(".sideCart-background")
const backgroundOpacity = document.querySelector(".background-opacity")
const scProductContainer = document.querySelector(".sc-product-container")
const scShippingContainer = document.querySelector(".sc-shipping-container")
const scTotalContainer = document.querySelector(".sc-total-container")

let sideCartFlag = false

console.log(cartIcon);
cartIcon.addEventListener("click", () => {
    const viewportWidth = window.innerWidth

    sideCartFlag = sideCartFlag ? false : true

    if (sideCartFlag) {
        sideCartContainer.style.width = viewportWidth >= 440 ? "440px" : "100vw"
        backgroundOpacity.style.width = "100vw"
        sideCartBackground.style.transform = "scale(4000)"
        scProductContainer.style.opacity = 1
        scShippingContainer.style.opacity = 1
        scTotalContainer.style.opacity = 1
    } else {
        sideCartContainer.style.width = "0px"
        backgroundOpacity.style.width = "0px"
        sideCartBackground.style.transform = "scale(1)"
        scProductContainer.style.opacity = 0
        scShippingContainer.style.opacity = 0
        scTotalContainer.style.opacity = 0
    }

})

/* ---- LISTENERS FUNCTIONS---- */

const deleteProduct = (event) => {
    const productCard = event.target.parentNode.parentNode
    const productCardContainer = productCard.parentNode

    productCardContainer.removeChild(productCard)

    //FALTA HACER UN FECTH PARA ELIMINAR EL PRODUCTO DEL CARRITO DE LA DB
}

const plusQuantity = (event) => {
    
}

const minusQuantity = (event) => {
    
}


const updateTotal = (event) => {
    
}