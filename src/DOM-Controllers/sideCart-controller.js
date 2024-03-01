const cartIcon = document.querySelector(".cart-icon")
const sideCartContainer = document.querySelector(".sideCart-container")
const sideCartBackground = document.querySelector(".sideCart-background")
const backgroundOpacity = document.querySelector(".background-opacity")
const scProductContainer = document.querySelector(".sc-product-container")
const scShippingContainer = document.querySelector(".sc-shipping-container")
const scTotalContainer = document.querySelector(".sc-total-container")

let sideCartFlag = false


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

/* ----ONCLICK FUNCTIONS---- */

const deleteProduct = (event) => {
    const productCard = event.target.parentNode.parentNode
    const productCardContainer = productCard.parentNode

    productCardContainer.removeChild(productCard)
}



const plusQuantity = (event) => {
    const inputQuantity = event.target.previousElementSibling

    const productCard = inputQuantity.parentNode.parentNode

    const productSubTotal = productCard.querySelector(".sc-product-subtotal")

    const unityPrice = productSubTotal.textContent / inputQuantity.value

    inputQuantity.value++


    productSubTotal.textContent = unityPrice * inputQuantity.value

}

const minusQuantity = (event) => {
    const inputQuantity = event.target.nextElementSibling

    if (inputQuantity.value > 1) {
        const productCard = inputQuantity.parentNode.parentNode

        const productSubTotal = productCard.querySelector(".sc-product-subtotal")

        const unityPrice = productSubTotal.textContent / inputQuantity.value

        inputQuantity.value--


        productSubTotal.textContent = unityPrice * inputQuantity.value
    }
}



/* ----ONCHANGE FUNCTIONS---- */

const updateProductPrice = (event) => {
    const inputQuantity = event.target
    const previousValue = inputQuantity.value

    inputQuantity.addEventListener("change", () =>{
        const newValue = inputQuantity.value

        console.log(newValue);



    })
    
   /*  const productCard = inputQuantity.parentNode.parentNode
    
    const productSubTotal = productCard.querySelector(".sc-product-subtotal")

    if (inputQuantity.value > 1) {
        

        const unityPrice = productSubTotal.textContent / inputQuantity.value
        

        productSubTotal.textContent = unityPrice * inputQuantity.value
        
    }else{
        inputQuantity.value = 1
    }
 */
}