function getParentNode(event, className) {
    let target = event.target

    while (!target.classList.contains(className)) {
        // condiciones de quiebre en caso de no encontrar el elemento padre buscado
        if (!target || target === document.body) break

        target = target.parentNode;
    }

    return target
}

function toProductDetail(event) {
    //Controlador para evitar el redireccioanmiento en caso de hacer click en los iconos de carrito o like
    if (event.target.classList.contains("cart-icon")) return
    if (event.target.classList.contains("heart-icon")) return

    const cardArticle = getParentNode(event, "tarjeta-articulo")

    const productId = cardArticle.querySelector("#productId").value

    window.location.href = `/products/detail/${productId}`
}

async function updateCartIcon(){
    if (!isLogged)  return

    const allCartProductsJSON = await fetch(`/cart/allCartProducts`)
    
    const allCartProducts = await allCartProductsJSON.json()
    
    const cartProductsIds = new Set()

    for (const cartProduct of allCartProducts) {
        cartProductsIds.add(cartProduct.productId)
    }

    const allProductsCards = document.querySelectorAll(".tarjeta-articulo")

    for (const productCard of allProductsCards) {
        const productId = productCard.querySelector("#productId").value

        if (cartProductsIds.has(productId)) {
            const cartIcon = productCard.querySelector(".cart-icon")
            cartIcon.style.color = "var(--verde-gotec)"
        }

    }
}

updateCartIcon()

