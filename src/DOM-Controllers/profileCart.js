async function profileCartDeleteProduct(event) {
    if (!isLogged) return

    try {
        const target = event.target

        let productCard = target.parentNode

        const cartProductId = productCard.querySelector("#cartProductId").value

        const apiURL = `/cart/deleteProduct/${cartProductId}`

        const resultJSON = await fetch(apiURL, {
            method: 'DELETE'
        })
        const result = await resultJSON.json()

        if (!result[0]) return console.log(result[1]);// si no se elimina de la base de dato, no permito que se elimine del container

        productCard.remove()

    } catch (err) {
        console.log("ERROR fn : deleteProduct ", err.message);
    }
}

async function profileCartUpdateProduct(event, quantityParam) {
    if (!isLogged) return

    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".profileCart-quantity-input")
    const cartProductId = productCard.querySelector("#cartProductId").value
    const productId = productCard.querySelector("#productId").value
    const productSubTotal = productCard.querySelector(".profileCart-product-subtotal")
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
    productSubTotal.textContent = (result[1].total).toFixed(2)

}

function profileCartChangeQuantity(event, action){
    if (!isLogged) return

    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".profileCart-quantity-input")
    let quantity = Number(inputQuantity.value)

    if (quantity && quantity >= 1) {
        if (action) {
            quantity++
        } else {
            quantity--
        }

        profileCartUpdateProduct(event, quantity)
    }
}



function profileCartEnterAction(event){
    const inputQuantity = event.target
    inputQuantity.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let quantity = Number(inputQuantity.value)

            if (quantity && quantity >= 1) profileCartUpdateProduct(event, quantity)

        }
    })
}
