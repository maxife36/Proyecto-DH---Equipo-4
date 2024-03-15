const orderSelect = document.querySelector("#orderBySelect")
const categorySelect = document.querySelector("#categorySelect")
const gteInput = document.querySelector("#gtePrice")
const lteInput = document.querySelector("#ltePrice")
const cardConatiner = document.querySelector(".cardConatiner")
const resetBtn = document.querySelector("#resetBtn")
const errorVerify = document.querySelector("#errorVerify")

/* por query categoryId, keywords, gte, lte , order, limit, offset*/
let filterSelected = {
    limit: 20,
    offset: 0
}

orderSelect.addEventListener("change", (event) => {
    const order = event.target.value
    filterSelected.order = order
    filtersearchExecutor()
})

categorySelect.addEventListener("change", (event) => {
    const categoryId = event.target.value
    filterSelected.categoryId = categoryId
    filtersearchExecutor()
})

gteInput.addEventListener("change", (event) => {
    const gte = event.target.value
    filterSelected.gte = gte
    filtersearchExecutor()
})

lteInput.addEventListener("change", (event) => {
    const lte = event.target.value
    filterSelected.lte = lte
    filtersearchExecutor()
})

resetBtn.addEventListener("click", () => {
    orderSelect.value = "default"
    categorySelect.value = "default"
    gteInput.value = 0
    lteInput.value = 0
    filterSelected = {}
    filterSelected.limit = 20
    filterSelected.offset = 0
    filterSelected.keywords = ""

    filtersearchExecutor()
})

async function filtersearchExecutor(){
    
    //Reinicio el offset
    filterSelected.offset = 0

    if (filterSelected.order === "default") delete filterSelected.order
    if (filterSelected.categoryId === "default") delete filterSelected.categoryId

    const {gte, lte} = filterSelected

    if (gte && lte && (+gte >= +lte)) {
        errorVerify.textContent = '"Menor a" > "Mayor a"'
        errorVerify.style.display = "block"
        return
    }
    
    errorVerify.style.display = "none"
    
    //Configuracion de URL
    const searchQuerys = Object.keys(filterSelected)

    let fetchURL = "/products/productsDisplay?"

    searchQuerys.forEach((searchKey, i) => {
        if (i !== (searchQuerys.length -1)){
            fetchURL += `${searchKey}=${filterSelected[searchKey]}&`
        }else{
            fetchURL += `${searchKey}=${filterSelected[searchKey]}`
        }
    })

    const productsDisplayHTML = await fetch(fetchURL)

    if(productsDisplayHTML){
        const productsDisplayTxt = await productsDisplayHTML.text()
    
        const parser = new DOMParser();
        const document = parser.parseFromString(productsDisplayTxt, 'text/html');
    
        // Obtener el contenido dentro de la sección cards
        const cardsSection = document.querySelector("#cardContainer");

        cardConatiner.innerHTML = cardsSection.innerHTML
    }
}
