/*cartIcon ya viene declarado de header-controller*/
// const cartIcon = document.querySelector(".cart-icon")

const sideCartContainer = document.querySelector(".sideCart-container")
const sideCartBackground = document.querySelector(".sideCart-background")
const backgroundOpacity = document.querySelector(".background-opacity")
const scProductContainer = document.querySelector(".sc-product-container")
const scShippingContainer = document.querySelector(".sc-shipping-container")
const scTotalContainer = document.querySelector(".sc-total-container")
const cartForm = document.querySelector("#cartForm")

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

/* ---- LISTENERS FUNCTIONS---- */

cartForm.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar que el formulario se envíe al presionar "Enter"
    }
})

const deleteProduct = async (event) => {
    try {

        const productCard = event.target.parentNode.parentNode //es el article que contiene la card del producto
        const productCardContainer = productCard.parentNode //es el div que contiene todas las cards del producto
        const cartProductId = productCard.querySelector("#cartProductId").value

        const apiURL = `/cart/deleteProduct/${cartProductId}`

        const resultJSON = await fetch(apiURL, {
            method: 'DELETE'
        })
        const result = await resultJSON.json()

        if (!result[0]) return console.log(result[1]);// si no se elimina de la base de dato, no permito que se elimine del container

        productCardContainer.removeChild(productCard)
    } catch (err) {
        console.log("ERROR fn : deleteProduct ", err.message);
    }
}

const updateProduct = async (event, quantityParam) => {
    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".quantity-input")
    const cartProductId = productCard.querySelector("#cartProductId").value
    const productId = productCard.querySelector("#productId").value
    const productSubTotal = productCard.querySelector(".sc-product-subtotal")
    const quantity = quantityParam ? quantityParam : Number(inputQuantity.value)

    if (!quantity || quantity <= 0) quantity = 1

    const updateData = {
        cartProductId,
        productId,
        currentQuantity: quantity,
    };

    const resultJSON = await fetch("/cart/updateQuantity", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    })

    const result = await resultJSON.json()

    if (!result[0]) return console.log(result[1]);// si no se modifica en la base de dato, no permito que se cambie sus datos en el front 

    inputQuantity.value = result[1].quantity
    productSubTotal.textContent = result[1].total
}

const changeQuantity = (event, action) => {
    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".quantity-input")
    let quantity = Number(inputQuantity.value)

    if (quantity && quantity >= 1) {
        if (action) {
            quantity++
        } else {
            quantity--
        }

        updateProduct(event, quantity)
    }
}

const enterAction = (event) => {
    const inputQuantity = event.target
    inputQuantity.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let quantity = Number(inputQuantity.value)

            if (quantity && quantity >= 1) updateProduct(event, quantity)

        }
    })
}




