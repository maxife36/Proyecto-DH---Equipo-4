
const settingsSection = document.querySelector(".settingsSection")
const displayContainer = document.querySelector(".settingDisplayConatiner")
const settingsDisplayBTn = document.querySelector(".user-icon-container")
const settingsExitBtn = document.querySelector("#settingsExit")

const userData = document.querySelector("#userData")
const userDataAngle = userData.querySelector("i")
const settingsArt3Childe = document.querySelector(".settingsArt:nth-child(3)")
const settingList = document.querySelector(".settingList")
const settingListLi = settingList.querySelectorAll("li")

const dashboardInput = document.querySelector("#dashboard")


/* Dinamicamente el display se ajusta segun el ancho que vaya tomando el side Menu */

const windowsWidth = window.innerWidth
const settingsSectionWidth = parseInt(window.getComputedStyle(settingsSection).width)
displayContainer.style.width = `${windowsWidth - settingsSectionWidth}px`

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const userDataJSON = await fetch("/users/userOnlyData")
        const userData = await userDataJSON.json()

        if (userData.admin) {
            dashboardInput.innerHTML = `
                <div class="optionName flx-r-nw" id="dashboardTitle">
                  <h4>Dashboard</h4>
                  <i class="fa-solid fa-angle-down"></i>
                </div>
                <ul class="settingList" id="settingListDashboard">
                  <li id="allProductsDisplay">Productos</li>
                  <li id="allUsersDisplay">Usuarios</li>
                </ul>
           `

            async function inyectPartialEJSDashboard(url, script, subSection) {
                try {

                    //Peticion que devuelve un archivo HTML con la pagina cargada
                    const fetchURL = `/admin/${url}`
                    const DataHTML = await fetch(fetchURL)

                    if (DataHTML) {
                        const DisplayTxt = await DataHTML.text()
                        displayContainer.innerHTML = DisplayTxt

                        if (script) {
                            //inyecto script por separado para que lo lea correctamente
                            const scriptElement = document.createElement('script');
                            scriptElement.src = `/DOM-Controllers/${script}`;
                            displayContainer.appendChild(scriptElement);
                        }
                        history.replaceState(null, null, `/users/profile?section=${url}&subSection=${subSection}`);
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            const allProductsDisplay = document.querySelector("#allProductsDisplay")
            const allUsersDisplay = document.querySelector("#allUsersDisplay")

            allProductsDisplay.addEventListener("click",() => inyectPartialEJSDashboard("allProducts", "allProducts", "products"))
            allUsersDisplay.addEventListener("click",() => inyectPartialEJSDashboard("allUsers", "allUsers", "users"))

        } else {
            // const articleDashboard = dashboardInput.parentNode
            dashboardInput.style.display = "none"
        }


        const dashboardTitle = document.querySelector("#dashboardTitle")

        if (dashboardTitle) {

            let dashboardFlag = false

            dashboardTitle.addEventListener("click", () => {
                const dashboardAngle = dashboardInput.querySelector("i")
                const logOutArticle = document.querySelector("#logOutArticle")
                const settingListDashboard = document.querySelector("#settingListDashboard")
                const settingListDashboardLi = settingListDashboard.querySelectorAll("li")

                dashboardFlag = dashboardFlag ? false : true

                if (dashboardFlag) {
                    settingListDashboard.style.height = "70px"
                    dashboardAngle.style.transform = "rotate(180deg) translateY(5px)"
                    settingListDashboardLi.forEach(li => {
                        li.style.pointerEvents = "auto"
                        li.style.opacity = 1
                    })
                    logOutArticle.style.marginTop = "10px"
                } else {
                    settingListDashboard.style.height = "0px"
                    dashboardAngle.style.transform = "rotate(0deg) translateY(0px)"
                    settingListDashboardLi.forEach(li => {
                        li.style.opacity = 0
                        li.style.pointerEvents = "none"
                    })
                    logOutArticle.style.marginTop = "20px"
                }

            })

        }

    } catch (error) {
        console.log(error.message);
    }
})

let userDataFlag = false

userData.addEventListener("click", () => {
    userDataFlag = userDataFlag ? false : true

    if (userDataFlag) {
        settingList.style.height = "70px"
        userDataAngle.style.transform = "rotate(180deg) translateY(5px)"
        settingListLi.forEach(li => {
            li.style.pointerEvents = "auto"
            li.style.opacity = 1
        })
        settingsArt3Childe.style.marginTop = "10px"
    } else {
        settingList.style.height = "0px"
        userDataAngle.style.transform = "rotate(0deg) translateY(0px)"
        settingListLi.forEach(li => {
            li.style.opacity = 0
            li.style.pointerEvents = "none"
        })
        settingsArt3Childe.style.marginTop = "20px"
    }
})

/* CONTROLADORES PARA MEDIAS QUERYS */
let flagDisplaySetting = true

window.addEventListener("resize", () => {
    //Controla el ancho del display
    const windowsWidth = window.innerWidth
    const settingsSectionWidth = parseInt(window.getComputedStyle(settingsSection).width)
    displayContainer.style.width = `${windowsWidth - settingsSectionWidth}px`

})


settingsExitBtn.addEventListener("click", () => {

    flagDisplaySetting = flagDisplaySetting ? false : true

    if (!flagDisplaySetting) {
        settingsSection.style.width = '0px';
        settingsSection.style.opacity = '1';
        displayContainer.style.display = 'flex';
        displayContainer.style.width = "100vw"
    }
})


/* --links controllers-- */
const personalDataLink = document.querySelector("#personalData")
const securityDataLink = document.querySelector("#securityData")
const purchasesLink = document.querySelector("#purchases")
const favoritesLink = document.querySelector("#favorites")
const cartDisplayLink = document.querySelector("#cartDisplay")
const dashboardLink = document.querySelector("#dashboard") //FALTA

//Remplazo la Url para simular la busqueda.. no recarga la pagina solo muestra una url distinta
//Redireccion directa a la seccion de favoritos
const currentURL = window.location.href
const querys = new URL(currentURL).searchParams

if (currentURL.includes("/users/profile")) {
    heartIcon.style.opacity = 0
    cartIcon.style.opacity = 0
    heartIcon.style.pointerEvents = "none"
    cartIcon.style.pointerEvents = "none"

    querys.forEach((value, key) => {
        if (key === "section") {
            value === "favorites" ? inyectPartialEJS("favorites") : ""
        }
    })

}

personalDataLink.addEventListener("click", () => inyectPartialEJS("userData"))
securityDataLink.addEventListener("click", () => inyectPartialEJS("securityData", "securityData"))
purchasesLink.addEventListener("click", () => inyectPartialEJS("purchases", "purchases"))
favoritesLink.addEventListener("click", () => inyectPartialEJS("favorites"))
cartDisplayLink.addEventListener("click", () => inyectPartialEJS("profileCart", "profileCart"))

async function inyectPartialEJS(url, script) {
    try {

        //Peticion que devuelve un archivo HTML con la pagina cargada
        const fetchURL = `/users/${url}`
        const DataHTML = await fetch(fetchURL)

        if (DataHTML) {
            const DisplayTxt = await DataHTML.text()
            displayContainer.innerHTML = DisplayTxt

            if (script) {
                //inyecto script por separado para que lo lea correctamente
                const scriptElement = document.createElement('script');
                scriptElement.src = `/DOM-Controllers/${script}`;
                displayContainer.appendChild(scriptElement);
            }
            history.replaceState(null, null, `/users/profile?section=${url}`);
        }

    } catch (error) {
        console.log(error);
    }
}
