const commentForm = document.querySelector("#addCommentForm")
const productImageConatiner = document.querySelector("#productImageConatiner")
const buyProductForm = document.querySelector("#buyProductForm")
const inputQuantity = document.querySelector("#mainQuantityInput")

if (url.includes("products/detail")) {
    const totalScoreDOM = document.querySelector("#totalScore")
    const totalScore = totalScoreDOM.getAttribute("totalScore")
    totalScoreDOM.style.background = `linear-gradient(90deg,var(--verde-gotec) ${(totalScore / 5) * 100}%,var(--gris-intermedio-gotec) ${(totalScore / 5) * 100}%,var(--gris-intermedio-gotec) 100%)`

    const allComments = document.querySelectorAll(".coment-user-info")
    const currentUsername = document.querySelector("#currentUsername").textContent.trim()

    allComments.forEach(comment => {
        if (comment.parentNode.tagName !== "FORM") {

            const commentUsername = comment.querySelector("h4").textContent

            if (commentUsername === currentUsername) {
                comment.innerHTML += `
                    <i class="fa-solid fa-trash" id="deleteComment" onclick="deleteComment(event)"></i>
                `
            } else {
                comment.removeAttribute("commentId")
            }
        }
    })

    /* ----------- */
    const firstImgDiv = document.querySelector(".controller-img-container div")
    firstImgDiv.style.backgroundColor = "var(--verde-gotec)"
}

inputQuantity.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        productDetailQuantity(event)
    }
})

commentForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const errorMsg = document.querySelector("#notEmptyComment")
    const commentBody = document.querySelector("#commentBody").value
    const userScore = document.querySelector("#userScore").value

    if (!commentBody) return errorMsg.textContent = "Debe escribir un comentario"
    if (!userScore) return errorMsg.textContent = "Debe otorgarle un puntaje"

    commentForm.submit()
})

async function favoritesProductDetailControlls(event) {
    try {
        if (!isLogged) return

        const mainSection = getParentNode(event, "main-section")
        const productId = mainSection.querySelector("#productId").value
        const heartIcon = mainSection.querySelector("#heartIconProductDetail")


        const isFavoriteJSON = await fetch(`/favorites/isFavorite/${productId}`)
        const isFavorite = await isFavoriteJSON.json()

        if (!isFavorite) {
            // HANDLER EN CASO QUE SE ADHIERA A FAVORITOS

            const newFavoriteJSON = await fetch('/favorites/addFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            })

            const newFavorite = await newFavoriteJSON.json()


            //configuraciones HTML y CSS en caso de Exito
            if (newFavorite) {

                heartIcon.setAttribute("favoriteId", newFavorite.favoriteId)
                heartIcon.style.color = "var(--verde-gotec)"
            }

        } else {
            // HANDLER EN CASO QUE SE ELIMINE DE FAVORITOS

            //verifico que exista el atributo con el favoriteId
            const isFavorite = heartIcon.getAttribute("favoriteId")
            if (!isFavorite) return

            const deleteFavoriteJSON = await fetch('/favorites/deleteFavorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favoriteId: isFavorite })
            })

            const deleteFavorite = await deleteFavoriteJSON.json()

            //Si se elimino correctamente el favorito, le retiro el atributo favoriteId y cambio el CSS
            if (deleteFavorite) {
                heartIcon.removeAttribute("favoriteId")
                heartIcon.style.color = "var(--azul-gotec)"
            }

        }


    } catch (error) {
        console.log(error.message);
    }
}

async function cartProductDetailControlls(event) {
    try {
        if (!isLogged) return

        const inputQuantity = document.querySelector(".quantity-input")
        const stockString = document.querySelector(".rest-quantity").textContent
        let quantity = Number(inputQuantity.value)

        const isStock = stockString.match(/\d+/)

        const stock = isStock?.length ? +isStock[0] : 0

        if (quantity <= stock) {
            const mainSection = getParentNode(event, "main-section")
            const productId = mainSection.querySelector("#productId").value
            const cartIcon = mainSection.querySelector("#cartIconProductDetail")
    
            const resultJSON = await fetch(`/cart/addProduct/${productId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity }),
            })
    
            const result = await resultJSON.json()
    
            if (result[0]) {
                const cartProductId = result[2].cartProductId
                const productInfoJSON = await fetch(`/cart/oneCartProducts/${cartProductId}`)
                const productInfo = await productInfoJSON.json()
                const cartProduct = productInfo.cartProduct
                const total = productInfo.total
                

                const scProductDisplay = document.querySelector(".sc-product-display")
                scProductDisplay.innerHTML += `
                        <article class="sc-product-card flx-r-nw">
                            <input type="hidden" name="cartProductId" id="cartProductId" value="${cartProduct.cartProductId}">
                            <input type="hidden" name="productId" id="productId" value="${cartProduct.productId}">
                            <input type="hidden" name="productStock" id="productStock" value="${cartProduct.product.stock}">
                            
                            <div class="sc-img-container flx-r-nw">
                                <img src="/img/Products-Image${cartProduct.product.images[0].imageTitle}" alt="">
                            </div>
                            <div class="sc-quantity-container flx-r-w">
                                <i class="minus-icon fa-solid fa-minus flx-r-w" onclick="changeQuantity(event, 0)"></i>
                                <input type="number" class="quantity-input" onfocus="enterAction(event)"  onchange="updateProduct(event)" min="1" value="${cartProduct.quantity}">
                                <i class="plus-icon fa-solid fa-plus flx-r-w" onclick="changeQuantity(event, 1)"></i>
                                <br>
                                ${cartProduct.product.discount ? `<i class='discount-text'>%${cartProduct.product.discount} OFF </i>` : ""} 
                            </div>
                            <p class="sc-product-subtotal">${total}</p>
                            <button type="button" class="sc-delete-product" onclick="deleteProduct(event)">
                                <i class="fa-solid fa-x"></i>
                            </button>
                        </article>
                `

                cartIcon.style.color = "var(--verde-gotec)"   

            }else if(result[1] === "Ya existe el producto en tu carrito"){
                const scCartProduct = document.querySelector(`.sc-product-card #productId[value='${productId}']`)?.parentNode
                const cartProductId = scCartProduct?.querySelector("#cartProductId")?.value 

                const resultJSON = await fetch(`/cart/deleteProduct/${cartProductId}`, {
                    method: 'DELETE'
                })

                const result = await resultJSON.json()

                if (result) {
                    scCartProduct.remove()
                    cartIcon.style.color = "var(--azul-gotec)"   
                }

            }
        }

    } catch (error) {
        console.log(error.message);
    }
}

function setUserScore(event) {
    const userScoreContainer = event.target.parentNode
    const userScoreInput = document.querySelector("#userScore")
    const userScoreSelected = event.target.id[5]

    userScoreInput.value = Number(userScoreSelected)

    for (let i = 1; i <= 5; i++) {
        const starToPaint = userScoreContainer.querySelector(`#star-${i}`)
        if (i <= Number(userScoreSelected)) {
            starToPaint.style.color = "var(--verde-oscuro-gotec)"
        } else {
            starToPaint.style.color = "var(--gris-intermedio-gotec)"
        }
    }

}

async function deleteComment(event) {
    try {
        const target = event.target
        const commentContainer = target.parentNode.parentNode
        const commentUserInfo = target.parentNode
        const commentId = commentUserInfo.getAttribute("commentId")

        const commentDeletedJSON = await fetch(`/products/deleteComment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ commentId })
        })

        const commentDeleted = await commentDeletedJSON.json()

        console.log(commentDeleted);

        if (commentDeleted) {
            commentContainer.remove()
        }

    } catch (error) {
        console.log(error.message);
    }
}

function changeImage(event) {
    const allImgSelectors = document.querySelectorAll(".imageSelector")
    const selectedImageTitle = event.target.getAttribute("imgTitle")
    const imgPosition = event.target.id
    productImageConatiner.src = `/img/Products-Image${selectedImageTitle}`

    allImgSelectors.forEach(selector => {
        if (selector.id === imgPosition) {
            selector.style.backgroundColor = "var(--verde-gotec)"
        } else {
            selector.style.backgroundColor = "var(--gris-intermedio-gotec)"
        }
    })
}

function productDetailChangeQuantity(event, action) {
    const productCard = event.target.parentNode
    const inputQuantity = productCard.querySelector(".quantity-input")
    const stockString = document.querySelector(".rest-quantity").textContent
    let quantity = Number(inputQuantity.value)

    const isStock = stockString.match(/\d+/)

    const stock = isStock?.length ? +isStock[0] : 0

    if (quantity && quantity >= 1) {
        if (action && quantity < +stock) {
            quantity++
        } else if (!action && quantity > 1) {
            quantity--
        }
        inputQuantity.value = quantity
        productDetailQuantity(event, inputQuantity)
    }
}

function productDetailQuantity(event, input) {
    const inputQuantity = input ? input : event.target
    const stockString = document.querySelector(".rest-quantity").textContent
    let quantity = Number(inputQuantity.value)

    const isStock = stockString.match(/\d+/)

    const stock = isStock?.length ? +isStock[0] : 0

    if (quantity > stock) {
        inputQuantity.style.border = "1px solid Red"
        inputQuantity.style.color = "Red"
    } else {
        inputQuantity.style.border = "1px solid var(--gris-intermedio-gotec)"
        inputQuantity.style.color = "var(--verde-masOscuro-gotec)"
    }
}

async function updateProductDetailHeartIcon() {
    if (!isLogged) return
    const heartIconProductDetail = document.querySelector("#heartIconProductDetail")
    const productId = document.querySelector("#productId").value

    if (heartIconProductDetail) {
        const resultJSON = await fetch("/favorites/allFavorites")
        const result = await resultJSON.json()

        for (const product of result) {
            if (product.productId === productId) {
                heartIconProductDetail.setAttribute("favoriteId", product.favoriteId)
                heartIconProductDetail.style.color = "var(--verde-gotec)"
            }
        }
    }
}

updateProductDetailHeartIcon()

async function updateProductDetailCartIcon() {
    if (!isLogged) return
    const CartIconProductDetail = document.querySelector("#cartIconProductDetail")
    const productId = document.querySelector("#productId").value

    if (CartIconProductDetail) {
        const resultJSON = await fetch("/cart/allCartProducts")
        const result = await resultJSON.json()

        for (const product of result) {
            if (product.productId === productId) {
                CartIconProductDetail.setAttribute("cartProductId", product.cartProductId)
                CartIconProductDetail.style.color = "var(--verde-gotec)"
            }
        }
    }
}

updateProductDetailCartIcon()

buyProductForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputQuantity = document.querySelector("#mainQuantityInput")
    const stockString = document.querySelector(".rest-quantity").textContent
    let quantity = Number(inputQuantity.value)

    const isStock = stockString.match(/\d+/)
    const stock = isStock?.length ? +isStock[0] : 0

    if (quantity > stock) return

    const shippingCost = document.querySelector("#productDetailShippingCost")
    shippingCost.removeAttribute("disabled")

    buyProductForm.submit()
})

/*  CONFIGURACION DEL MAPA LEAFET */

const productDetailStorePickup = document.querySelector("#productDetailStorePickup")
const productDetailHomeDelivery = document.querySelector("#productDetailHomeDelivery")
const productDetailShippingPlace = document.querySelector("#productDetailShippingPlace")

const productDetailShippingCost = document.querySelector("#productDetailShippingCost")
const productDetailShippingDistance = document.querySelector("#productDetailShippingDistance")

productDetailStorePickup.addEventListener("click", (event) => {
    const target = event.target

    if (target.checked) {
        productDetailHomeDelivery.checked = false

        // Cargo el mapa en el cual se inyectaran los markers
        const freePickup = mapGenerator("Punto de Recolección")

        // titulo del mapa
        const mapTitle = document.querySelector(".mapTitle")

        //Establezco coordenadas de pickups 
        const pickupCoords = {
            oca: {
                lat: -27.778042262966565,
                lng: -64.26787961025269,
                title: "OCA SRL"
            },
            andreani: {
                lat: -27.788891927602023,
                lng: -64.2617887489563,
                title: "Andreani"
            },
            correoArgSgo: {
                lat: -27.787877303545834,
                lng: -64.25623976550744,
                title: "Correo Arg. Sgo. del Estero"
            },
            correoArgBanda: {
                lat: -27.734103579415624,
                lng: -64.24240627786992,
                title: "Correo Arg. La Banda"
            },
        }

        //Establezco listener para cerrar el modal
        const closeBtnMap = document.querySelector("#mapExit")

        for (const pickupPlace in pickupCoords) {
            const pickupObj = pickupCoords[pickupPlace]

            const marker = L.marker([pickupObj.lat, pickupObj.lng])
            marker.bindTooltip(pickupObj.title).openTooltip()
            marker.addTo(freePickup)

            //Agrego listener por cada amarcador
            marker.on('click', function () {
                // Recuperar la posición y titulo del marcador
                const position = marker.getLatLng();
                const title = marker.getTooltip().getContent();

                productDetailShippingPlace.value = title
                modalMappBackground.style.width = "0px"
                modalMappBackground.style.height = "0px"
                closeBtnMap.style.display = "none"
                mapTitle.style.display = "none"


                //Actualizacion de distancia de envio
                productDetailShippingDistance.value = 0
                productDetailShippingCost.value = `$ 0`
            })
        }

        closeBtnMap.addEventListener("click", () => {
            modalMappBackground.style.width = "0px"
            modalMappBackground.style.height = "0px"
            closeBtnMap.style.display = "none"
            mapTitle.style.display = "none"
        })
    }

})

productDetailHomeDelivery.addEventListener("click", (event) => {
    const target = event.target

    if (target.checked) {
        //Reinicio de algunos elementos

        productDetailStorePickup.checked = false
        productDetailShippingPlace.value = ""

        //Flag de control para que se pueda colcoar un solo marker
        let markerFlag = false
        // Cargo el mapa en el cual se inyectaran los markers
        const customeMap = mapGenerator("Envio a Domicilio")

        // titulo del mapa
        const mapTitle = document.querySelector(".mapTitle")

        // Agrego un marcador para la ubicación inicial
        const defaultMarker = L.marker([-27.847419, -64.265505])

        // variable que guardara la lat y long del pin que coloque el usuario, su respectivo marcador, y la distancia con el maracdoir por defecto
        let userLatLng = null
        let userMarker = null
        let shippingDistance = 0

        //Establezco listener para cerrar el modal
        const closeBtnMap = document.querySelector("#mapExit")

        // Agregar un control de click para colocar marcadores
        customeMap.on('click', function (event) {
            if (markerFlag) userMarker.remove()

            userLatLng = event.latlng;
            userMarker = L.marker(userLatLng).addTo(customeMap);

            // Calculo la distancia entre el marcador del usuario y el marcador por defecto
            shippingDistance = defaultMarker.getLatLng().distanceTo(userLatLng) / 1000; // Convierto a kilómetros
            productDetailShippingDistance.value = shippingDistance


            //Calculo del precio de envio
            const shippingPrice = shippingCalculator(shippingDistance)
            productDetailShippingCost.value = `$ ${shippingPrice.toFixed(2)}`

            markerFlag = true
        });



        closeBtnMap.addEventListener("click", () => {
            modalMappBackground.style.width = "0px"
            modalMappBackground.style.height = "0px"
            closeBtnMap.style.display = "none"
            mapTitle.style.display = "none"

        })
    }
})


