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

async function addToCart(event) {
    const cardArticle = getParentNode(event, "tarjeta-articulo")
    const productId = cardArticle.querySelector("#productId").value
    const cartProductDisplay = document.querySelector(".sc-product-display")

    const resultJSON = await fetch(`/cart/addProduct/${productId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }),
    })

    const result = await resultJSON.json()

    if (!result[0]) {
        //manejo para eliminar del carrito cuando vuelva a hacer click en el icono
        const allCartProducts = document.querySelectorAll(".sc-product-card")

        for (const cartProduct of allCartProducts) {
            const cartProductId = cartProduct.querySelector("#productId").value

            if (cartProductId !== productId) continue

            const deleteBtn = cartProduct.querySelector(".sc-delete-product")

            deleteBtn.click()

            event.target.style.color = "var(--azul-gotec)"

            break
        }

        return result[1]
    }

    const allCartProductsJSON = await fetch(`/cart/allCartProducts`)

    const allCartProducts = await allCartProductsJSON.json()

    const cartProduct = allCartProducts?.find(cartProduct => cartProduct.productId === productId)

    const total = (cartProduct.quantity * cartProduct.product.productPrice).toFixed(2)

    const domCartProduct = `
            <article class="sc-product-card flx-r-nw">
                <input type="hidden" name="cartProductId" id="cartProductId" value="${cartProduct.cartProductId}">
                <input type="hidden" name="productId" id="productId" value="${cartProduct.productId}">
                <div class="sc-img-container  flx-r-nw">
                    <img src="/img/Products-Image${cartProduct.product.images[0].imageTitle}" alt="">
                </div>
                <div class="sc-quantity-container flx-r-w">
                    <i class="minus-icon fa-solid fa-minus flx-r-w" onclick="changeQuantity(event, 0)"></i>
                    <input type="number" class="quantity-input" onfocus="enterAction(event)"  onchange="updateProduct(event)" min="1" value="${cartProduct.quantity}">
                    <i class="plus-icon fa-solid fa-plus flx-r-w" onclick="changeQuantity(event, 1)"></i>
                    <br>
                    ${cartProduct.product.discount ? `
                        <i class="discount-text">
                            %${cartProduct.product.discount} OFF
                        </i>
                    ` : ""}
                </div>
                <p class="sc-product-subtotal">${total}</p>
                <button type="button" class="sc-delete-product" onclick="deleteProduct(event)">
                    <i class="fa-solid fa-x"></i>
                </button>
            </article>`

    cartProductDisplay.innerHTML += domCartProduct

    updateTotal()

    event.target.style.color = "var(--verde-gotec)"
}

async function updateCartIcon(){
    
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