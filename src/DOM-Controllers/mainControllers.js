const previousBrand = document.querySelector(".previous-icon")
const nextBrand = document.querySelector(".next-icon")
const brandsImgWraper = document.querySelector(".brandsImgWraper")
const bannerContainer = document.querySelector(".carouselBannerContainer")
const allBrandImg = brandsImgWraper.querySelectorAll("img")

let brandsWraperRealWidth = 0
let brandsWraperWindowWidth = parseFloat(window.getComputedStyle(brandsImgWraper).width)


// obtengo los limites de carrusel de marcas

allBrandImg.forEach(img => {
    const computerStyle = window.getComputedStyle(img);
    const imgWidth = parseFloat(computerStyle.width);
    brandsWraperRealWidth += imgWidth
})

nextBrand.addEventListener("click", () => {
    const brandsImgWraper = document.querySelector(".brandsImgWraper")
    const computerStyle = window.getComputedStyle(brandsImgWraper);
    const right = parseFloat(computerStyle.right)
    
    if ((brandsWraperRealWidth - right) >= brandsWraperWindowWidth) {
        brandsImgWraper.style.right = `${right + brandsWraperWindowWidth}px` 
    }else if ((brandsWraperRealWidth - right) > 0) {
        brandsImgWraper.style.right = `$0px` 
    }

})
previousBrand.addEventListener("click", () => {
    const brandsImgWraper = document.querySelector(".brandsImgWraper")
    const computerStyle = window.getComputedStyle(brandsImgWraper);
    const right = parseFloat(computerStyle.right)
    
    if ((brandsWraperRealWidth - right) <= (brandsWraperRealWidth - brandsWraperWindowWidth )) {
        brandsImgWraper.style.right = `${right - brandsWraperWindowWidth}px` 
    }else if ((brandsWraperRealWidth - right) ) {
        brandsImgWraper.style.right = `$0px` 
    }

})

window.addEventListener("resize", () => {
    const allBrandImg = brandsImgWraper.querySelectorAll("img")
    const brandsImgWraper = document.querySelector(".brandsImgWraper")


    brandsWraperWindowWidth = parseFloat(window.getComputedStyle(brandsImgWraper).width)

    allBrandImg.forEach(img => {
        const computerStyle = window.getComputedStyle(img);
        const imgWidth = parseFloat(computerStyle.width);
        brandsWraperRealWidth += imgWidth
    })
})
/* ----------------- */
let bannerNum = 1

function bannerInterval(){
    if (bannerNum > 3) bannerNum = 1

    const bannerImages = bannerContainer.querySelectorAll(`div`)

    bannerImages.forEach(banner =>{

        if (banner.id != `banner${bannerNum}` ) {
            banner.style.opacity = 0
        }else{
            banner.style.opacity = 1
        }
    })

    bannerNum++
}

setInterval(bannerInterval, 5000)




//-----------------

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

//Sirve para la primera carga pintar los iconos de los productos que estan en el carrito
async function updateCartIcon() {
    if (!isLogged) return

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

//Sirve para la primera carga pintar los iconos de los productos que estan en favoritos

async function updateHeartIcon() {
    if (!isLogged) return

    const resultJSON = await fetch("/favorites/allFavorites")
    const result = await resultJSON.json()

    const favoriteProducts = {}

    for (const product of result) {
        favoriteProducts[product.productId] = product.favoriteId
    }

    const allProductsCards = document.querySelectorAll(".tarjeta-articulo")

    for (const productCard of allProductsCards) {
        const productId = productCard.querySelector("#productId").value
        const favoriteId = favoriteProducts[productId]

        if (favoriteId) {
            const heartIcon = productCard.querySelector(".heart-icon")

            productCard.setAttribute("favoriteId", favoriteId)
            heartIcon.style.color = "var(--verde-gotec)"
        }

    }
}

updateHeartIcon()

