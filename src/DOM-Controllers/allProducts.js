const searchInput = document.querySelector(".profileSearchInput")

function newProduct(event) {
    window.location.href = "/products/create"
}

async function dashboardProductController(event){
    const target = event.target

    if (target.classList.contains("fa-trash")) {
        await destroyProductOnDB(event)
    }else{
        const dataContainer = getParentNode(event, "profileCartDataConatiner")
        const productId = dataContainer.querySelector("#productId").value
        window.location.href = `/products/edit/${productId}`
    }
}

async function destroyProductOnDB(event){
    const isSure = confirm("¿Estás seguro de querer eliminar este Producto?")

    if (isSure) {
        const dataContainer = getParentNode(event, "profileCartDataConatiner")
        const productId = dataContainer.querySelector("#productId").value
    
        const resultJSON = await fetch(`/products/delete/${productId}`,{
            method: "DELETE"
        })
    
        const result = await resultJSON.json()
    
        if (result) {
            dataContainer.remove()
        }
    }
}

searchInput.addEventListener("input", (event) => {
    const allProductsName = document.querySelectorAll(".favoriteProductName")

    const searchedWord = event.target.value?.toLowerCase()

    if (searchedWord) {
        allProductsName.forEach(product => {
            const lowerProductName = product.textContent.toLowerCase()

            if (!lowerProductName.includes(searchedWord)) {
                const productContainer = product.parentNode
                productContainer.style.display = "none"
            }
        })
    } else {
        allProductsName.forEach(product => {
            const productContainer = product.parentNode
            productContainer.style.display = "flex"
        })
    }
})

