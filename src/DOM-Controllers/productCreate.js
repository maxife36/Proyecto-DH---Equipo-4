/* --ELEMENTOS DEL DOM-- */
const featureConatiner = document.querySelector(".all-feature-container")
const productImageConatiner = document.querySelector("#productImageConatiner")
const imageControllers = document.querySelector(".controller-img-container")
const addImg = document.querySelector("#add-img")
const addImgLabel = document.querySelector(".addImageLabel")
const createForm = document.querySelector("#createProductForm")

let helpFlag = false
let allCategories = null
let allFeatures = null
let allFeaturesOptionsHTML = ""

window.addEventListener("load", async () => {
    try {
        /* --CARGA DE DATOS-- */
        const allCategoriesJSON = await fetch("/products/allCategories")
        const allFeaturesJSON = await fetch("/products/allFeatures")

        allCategories = await allCategoriesJSON.json()
        allFeatures = await allFeaturesJSON.json()

        allFeatures.forEach(feature => {
            allFeaturesOptionsHTML += `
                <option value="${feature.featureId}" featureIcon="${feature.featureIcon}" >
                ${feature.featureName}
                </option>
            `
        });

    } catch (error) {
        console.log(error.message);
    }
})

function helpBtn(event) {
    helpFlag = helpFlag ? false : true

    if (helpFlag) {
        event.target.style.backgroundColor = "#67b59880";
        updateWarnings()
    } else {
        const allInputs = document.querySelectorAll("input")
        const allTextAreas = document.querySelectorAll("textarea")
        const allSelects = document.querySelectorAll("select")

        addImgLabel.removeAttribute("style")
        event.target.removeAttribute("style")

        allInputs.forEach(input => {
            input.removeAttribute("style")
        })

        allTextAreas.forEach(textArea => {
            textArea.removeAttribute("style")
        })

        allSelects.forEach(select => {
            select.removeAttribute("style")
        })
    }
}

function updateWarnings() {
    const allInputs = document.querySelectorAll("input")
    const allTextAreas = document.querySelectorAll("textarea")
    const allSelects = document.querySelectorAll("select")

    if (addImg.files.length == 0) {
        addImgLabel.style.color = "#d11b1b"
    } else {
        addImgLabel.removeAttribute("style")
    }

    allInputs.forEach(input => {
        const id = input.id

        if (id == "discount" && !input.value) {
            input.style.backgroundColor = "#f0e19e"
            input.style.border = "1px solid #c9aa1f"
            input.style.color = "1px solid #8a7000"

        } else if (!input.classList.contains("specification") && !input.value && id !== "searchForm") {
            input.style.backgroundColor = "#e7caca"
            input.style.border = "1px solid red"
            input.style.color = "#523535"
        } else {
            input.removeAttribute("style")
        }
    })

    allTextAreas.forEach(textArea => {
        const id = textArea.id
        if (id == "longDescription" && !textArea.value) {
            textArea.style.backgroundColor = "#f0e19e"
            textArea.style.border = "1px solid #c9aa1f"
            textArea.style.color = "#8a7000"

        } else if (!textArea.value) {
            textArea.style.backgroundColor = "#e7caca"
            textArea.style.border = "1px solid red"
            textArea.style.color = "#523535"
        } else {
            textArea.removeAttribute("style")
        }
    })

    allSelects.forEach(select => {
        const id = select.id

        if (id === "featureTitle" && select.value === "default") {
            select.style.backgroundColor = "#f0e19e"
            select.style.border = "1px solid #c9aa1f"
            select.style.color = "#8a7000"

        } else if (select.value === "default") {
            select.style.backgroundColor = "#e7caca"
            select.style.border = "1px solid red"
            select.style.color = "#523535"
        } else {
            select.removeAttribute("style")
        }
    })
}

function formatImgChecker(InputImg) {

    let checkFlag = false

    const supportedFormats = ["jpg", "jpeg", "png"]

    let typeImg = InputImg.files[0].type.slice(6)

    supportedFormats.forEach(el => { el === typeImg ? checkFlag = true : "" })

    return checkFlag
}

function addFeatureContainer(event) {
    featureConatiner.innerHTML += `
    <article class="item-feature flx-c-nw">
      <i class="fa-solid fa-x featureDelete" onclick="deleteFeature(event)"></i>

      <div class="feature-title flx-r-nw">

      <img  src="/img/FeatureImg/otrasCaracteristicas.png"  class="featureIcon"/>
        <select class="inputGralStyle flx-r-nw" name="featureTitle" id="featureTitle" onchange="updateIconFeature(event)">
            <option value="default">Seleccionar</option>
            ${allFeaturesOptionsHTML}
        </select>
        <i class="plus-icon fa-solid fa-plus flx-r-w" onclick="addSpecification(event)"></i>
      </div>

      <ul class="feature-list flx-c-w">
          <li>
            <i class="minus-icon fa-solid fa-minus flx-r-w" onclick="deleteSpecification(event)"></i>
            <input type="text" class="specification" max="20" placeholder="Su especificación...">
          </li>   
      </ul>
    </article>
    `
}

function deleteFeature(event) {
    const target = event.target
    const itemFeature = target.parentNode
    itemFeature.remove()
}

function addSpecification(event) {
    const target = event.target
    const itemFeature = target.parentNode.parentNode
    const featureList = itemFeature.querySelector(".feature-list")
    const featureListItems = featureList.querySelectorAll("li")

    if (featureListItems.length < 4) {
        featureList.innerHTML += `
        <li>
            <i class="minus-icon fa-solid fa-minus flx-r-w" onclick="deleteSpecification(event)"></i>
            <input type="text" class="specification" max="20" placeholder="Su especificación...">
        </li>    
        `
    }
}

function deleteSpecification(event) {
    const target = event.target
    const listItem = target.parentNode
    listItem.remove()
}

function updateIconFeature(event) {
    const target = event.target
    const featureTitleContainer = target.parentNode
    const featureIconImg = featureTitleContainer.querySelector(".featureIcon")

    const optionSeleccionado = target.options[target.selectedIndex]
    const featureIcon = optionSeleccionado.getAttribute("featureIcon")


    if (featureIcon) {
        featureIconImg.src = `/img/FeatureImg${featureIcon}`
    } else {
        featureIconImg.src = "/img/FeatureImg/otrasCaracteristicas.png"
    }

}

function changeImage(event) {
    const allImgSelectors = document.querySelectorAll(".imageSelector")
    const selectedImageTitle = event.target.getAttribute("imgTitle")
    const imgPosition = event.target.id
    productImageConatiner.src = selectedImageTitle

    allImgSelectors.forEach(selector => {
        if (selector.id === imgPosition) {
            selector.style.backgroundColor = "var(--verde-gotec)"
        } else {
            selector.style.backgroundColor = "var(--gris-intermedio-gotec)"
        }
    })

}

addImg.addEventListener("change", () => {


    if (addImg.files.length > 0) {

        let count = true

        imageControllers.innerHTML = ""

        for (let i = 0; i < addImg.files.length; i++) {

            let formatFlag = true

            if (!formatImgChecker(addImg)) formatFlag = false

            if (formatFlag) {
                const url = URL.createObjectURL(addImg.files[i]);

                if (count) {
                    //cargo la primera imagen              
                    productImageConatiner.src = url
                    imageControllers.innerHTML += `
                    <div  id="${i}" class="imageSelector" imgTitle="${url}" onclick="changeImage(event)"></div>
                    `
                    const firstImgSelector = imageControllers.querySelector(".imageSelector")
                    firstImgSelector.style.backgroundColor = "var(--verde-gotec)"

                    count = false
                    continue
                }

                imageControllers.innerHTML += `
                <div  id="${i}" class="imageSelector" imgTitle="${url}" onclick="changeImage(event)"></div>
                `

            } else {
                window.alert("Formato de imagen no soportado")
            }

        }

        updateWarnings()

    } else {
        window.alert("No ingreso niguna imagen")
    }
})

createForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const customeData = {}
    let noErrors = true

    /* Algunos inputs */
    const addImg = document.querySelector("#add-img")

    const productName = createForm.querySelector("#productName")?.value
    const shortDescription = createForm.querySelector("#shortDescription")?.value
    const productBrand = createForm.querySelector("#productBrand")?.value
    const productPrice = createForm.querySelector("#productPrice")?.value
    const stock = createForm.querySelector("#stock")?.value
    const discount = createForm.querySelector("#discount")?.value
    const longDescription = createForm.querySelector("#longDescription")?.value


    if (!productName || !shortDescription || !productBrand || !productPrice ||!stock){
        noErrors = false
    }else{
        customeData.productName = productName
        customeData.productBrand = productBrand
        customeData.shortDescription = shortDescription
        customeData.longDescription = longDescription
        customeData.productPrice = productPrice
        customeData.discount = discount
        customeData.stock = stock
    }

    if (addImg.files.length = 0) {
        noErrors = false
    }

    /* category configuration */
    const categoryInput = createForm.querySelector("#productCategory")
    const category = categoryInput.value

    if (category) {
        //inyecto en el objeto para el formdata
        customeData.categories = [category]
    }else{
        noErrors = false
    }

    /* features configuration */

    const features = []
    const allFeatureArticles = createForm.querySelectorAll(".item-feature")

    allFeatureArticles.forEach(article => {
        const newFeature = {
            specifications: []
        }

        const select = article.querySelector("#featureTitle")
        const selectValue = select.value
        const specifications = article.querySelectorAll(".specification")

        if (selectValue && selectValue !== "default") {
            newFeature.featureId = selectValue

            specifications.forEach(specification => {

                if (specification.value && specification.value.length <= 20) {
                    newFeature.specifications.push(specification.value)
                }
            })
        }

        if (newFeature.featureId && newFeature.specifications.length > 0) {
            features.push(newFeature)
        }
    })

    //inyecto en el objeto para el formdata
    customeData.features = features

    /* verification errors */
    const formData = new FormData(event.target)
    formData.append("customeData", JSON.stringify(customeData))

    console.log(noErrors);
    if (!noErrors) updateWarnings()
    if (noErrors) {

        const resultJSON = await fetch("/products/create", {
            method: "POST",
            body: formData
        })

        const result = await resultJSON.json()

        if (result[0]) {
            window.location.href = `/products/detail/${result[1]}`
        }
    }
})