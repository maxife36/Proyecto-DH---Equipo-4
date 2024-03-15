const orderSelect = document.querySelector("#orderBySelect")
const categorySelect = document.querySelector("#categorySelect")
const gteInput = document.querySelector("#gtePrice")
const lteInput = document.querySelector("#ltePrice")
const cardConatiner = document.querySelector(".cardConatiner")
const resetBtn = document.querySelector("#resetBtn")
const errorVerify = document.querySelector("#errorVerify")
const filterSection = document.querySelector(".filterSection")
const filterExitBtn = document.querySelector("#filterExit")
const filterDisplayBtn = document.querySelector("#filterBtn")
const paginationControllers = document.querySelector(".paginationControllers")

/* CONTROLADORES PARA MEDIAS QUERYS */

let flagDisplayfilter = false

window.addEventListener('resize', function () {
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 660) {
        flagDisplayfilter = false
        filterSection.style.opacity = '1';
        filterDisplayBtn.style.display = 'none';
        filterExitBtn.style.display = 'none';
    }
});

filterDisplayBtn.addEventListener("click", () => {

    flagDisplayfilter = flagDisplayfilter ? false : true

    if (flagDisplayfilter) {
        filterSection.style.width = '100vw';
        filterSection.style.opacity = '1';
        filterDisplayBtn.style.display = 'none';
        cardConatiner.style.display = 'none';
    }
})

filterExitBtn.addEventListener("click", () => {

    flagDisplayfilter = flagDisplayfilter ? false : true

    if (!flagDisplayfilter) {
        filterSection.style.width = '0px';
        filterSection.style.opacity = '0';
        filterDisplayBtn.style.display = 'block';
        cardConatiner.style.display = 'flex';
    }
})

/* CONTROLADORES DE FILTROS */

/* por query categoryId, keywords, gte, lte , order, limit, offset*/
let filterSelected = {
    limit: 20,
    offset: 0
}

let totalProductsNumber = 0
let numberOfPages = 0

/* Primera vez que se accede a la pagina */

window.addEventListener("load", async function () {
    const currentURL = window.location.href
    const querys = new URLSearchParams(new URL(currentURL).search);

    querys.forEach((value, key) => {
        if (key !== "isFirst") {
            filterSelected[key] = value
        }
    });

    //Cargo la opcion del select ya que si la primera carga se hace a traves de una categoria, deberia figurar por cual fue
    if (filterSelected.categoryId) {
        const categorySelect = document.querySelector("#categorySelect");
        const categoryOption = categorySelect.querySelector(`option[value="${filterSelected.categoryId}"]`)
        categoryOption.selected = true
    }

    //Actualizo la busqueda para que cargue todos los elementos extra que se cargan en la siguiente funcion
    await filtersearchExecutor()

    querys.forEach((value, key) => {
        if (key !== "isFirst") {
            delete filterSelected[key]
        }
    });
});

orderSelect.addEventListener("change", async (event) => {
    const order = event.target.value
    filterSelected.order = order
    //Reinicio el offset
    filterSelected.offset = 0
    await filtersearchExecutor()
})

categorySelect.addEventListener("change", async (event) => {
    const categoryId = event.target.value
    filterSelected.categoryId = categoryId
    //Reinicio el offset
    filterSelected.offset = 0
    await filtersearchExecutor()
})

gteInput.addEventListener("change", async (event) => {
    const gte = event.target.value
    filterSelected.gte = gte
    //Reinicio el offset
    filterSelected.offset = 0
    await filtersearchExecutor()
})

lteInput.addEventListener("change", async (event) => {
    const lte = event.target.value
    filterSelected.lte = lte
    //Reinicio el offset
    filterSelected.offset = 0
    await filtersearchExecutor()
})

resetBtn.addEventListener("click", async () => {
    orderSelect.value = "default"
    categorySelect.value = "default"
    gteInput.value = 0
    lteInput.value = 0
    filterSelected = {}
    filterSelected.limit = 20
    filterSelected.offset = 0
    filterSelected.keywords = ""

    await filtersearchExecutor()
})

async function filtersearchExecutor() {
    if (filterSelected.order === "default") delete filterSelected.order
    if (filterSelected.categoryId === "default") delete filterSelected.categoryId

    const { gte, lte } = filterSelected

    if (gte && lte && (+gte >= +lte)) {
        errorVerify.textContent = '"Menor a" > "Mayor a"'
        errorVerify.style.display = "block"
        return
    }

    errorVerify.style.display = "none"

    //Actualizacion de totalProductsNumber y numberOfPages

    await pagesInfoUpdate()

    //Configuracion de URL
    const searchQuerys = Object.keys(filterSelected)

    let fetchURL = "/products/productsDisplay?"

    searchQuerys.forEach((searchKey, i) => {
        if (i !== (searchQuerys.length - 1)) {
            fetchURL += `${searchKey}=${filterSelected[searchKey]}&`
        } else {
            fetchURL += `${searchKey}=${filterSelected[searchKey]}`
        }
    })

    //Remplazo la Url para simular la busqueda.. no recarga la pagina solo muestra una url distinta
    history.replaceState(null, null, fetchURL);

    //Peticion que devuelve un archivo HTML con la pagina cargada

    const productsDisplayHTML = await fetch(fetchURL)

    if (productsDisplayHTML) {
        const productsDisplayTxt = await productsDisplayHTML.text()

        const parser = new DOMParser();
        const document = parser.parseFromString(productsDisplayTxt, 'text/html');

        // Obtener el contenido dentro de la sección cards
        const cardsSection = document.querySelector("#cardContainer");
        const paginationControllers = document.querySelector(".paginationControllers")
        const pagesNumbersContainer = cardsSection.querySelector(".pagesNumbersContainer");

        //Oculta los controladores de paginado en caso de tener una sola pagina
        if (numberOfPages === 1) paginationControllers.style.display = "none"

        //Estilo css para numero de pagina actual
        const cssPageSelected = "style='font-size: 18px; font-weight: 600'"

        for (let i = 0; i < numberOfPages; i++) {
            if (i !== (numberOfPages - 1)) {
                pagesNumbersContainer.innerHTML += `
                    <p class="pageNumber flx-r-nw" ${filterSelected.offset === i ? cssPageSelected : ""} onclick="goToPage(event)">${i}</p>
                    <p class="pageSeparator flx-r-nw">-</p>
                `
            } else {
                pagesNumbersContainer.innerHTML += `
                    <p class="pageNumber flx-r-nw" ${filterSelected.offset === i ? cssPageSelected : ""} onclick="goToPage(event)">${i}</p>
                `
            }
        }

        cardConatiner.innerHTML = cardsSection.innerHTML
    }
}

async function pagesInfoUpdate() {
    //Numero Total de Paginas de la busqueda

    const filterSelectedCopy = { ...filterSelected }
    delete filterSelectedCopy.limit
    delete filterSelectedCopy.offset
    filterSelectedCopy.allData = true

    const searchQuerysAllData = Object.keys(filterSelectedCopy)

    let fetchAllDataURL = "/products/productsDisplay?"

    searchQuerysAllData.forEach((searchKey, i) => {
        if (i !== (searchQuerysAllData.length - 1)) {
            fetchAllDataURL += `${searchKey}=${filterSelectedCopy[searchKey]}&`
        } else {
            fetchAllDataURL += `${searchKey}=${filterSelectedCopy[searchKey]}`
        }
    })

    const productsDisplayAllDataJSON = await fetch(fetchAllDataURL)
    const productsDisplayAllData = await productsDisplayAllDataJSON.json()

    totalProductsNumber = productsDisplayAllData.length
    numberOfPages = Math.ceil(totalProductsNumber / filterSelected.limit)
}

async function previousPage(event) {
    const offset = filterSelected.offset

    if (offset > 0 && offset <= numberOfPages - 1) {
        filterSelected.offset -= 1
        await filtersearchExecutor()
    }
}

async function nextPage(event) {
    const offset = filterSelected.offset

    if (offset >= 0 && offset < numberOfPages - 1) {
        filterSelected.offset += 1
        await filtersearchExecutor()
    }
}

async function goToPage(event) {
    const offset = Number(event.target.textContent)
    if (offset >= 0 && offset <= numberOfPages - 1) {
        filterSelected.offset = offset
        await filtersearchExecutor()
    }
}
