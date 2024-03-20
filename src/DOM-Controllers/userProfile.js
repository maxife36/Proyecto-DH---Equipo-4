
const settingsSection = document.querySelector(".settingsSection")
const displayContainer = document.querySelector(".settingDisplayConatiner")
const settingsDisplayBTn = document.querySelector(".user-icon-container")
const settingsExitBtn = document.querySelector("#settingsExit")

const userData = document.querySelector("#userData")
const userDataAngle = userData.querySelector("i")
const settingsArt3Childe = document.querySelector(".settingsArt:nth-child(3)")
const settingList = document.querySelector(".settingList")
const settingListLi = settingList.querySelectorAll("li")

/* Dinamicamente el display se ajusta segun el ancho que vaya tomando el side Menu */

const windowsWidth = window.innerWidth
const settingsSectionWidth = parseInt(window.getComputedStyle(settingsSection).width)
displayContainer.style.width = `${windowsWidth - settingsSectionWidth}px`

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

//Primero el listener que estaba provisto en el header controller y luego agrgeo uno nuevo
userProfile.removeEventListener("click", reLocation)
userProfile.addEventListener("click", () => {
    if (window.innerWidth < 660) {
        flagDisplaySetting = flagDisplaySetting ? false : true

        if (flagDisplaySetting) {
            settingsSection.style.width = '100vw';
            settingsSection.style.opacity = '1';
            displayContainer.style.display = 'none';
        }
    }
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


personalDataLink.addEventListener("click", () => inyectPartialEJS ("userData"))
securityDataLink.addEventListener("click", () => inyectPartialEJS ("securityData", "securityData"))
purchasesLink.addEventListener("click", () => inyectPartialEJS ("purchases", "purchases"))
favoritesLink.addEventListener("click", () => inyectPartialEJS ("favorites"))
cartDisplayLink.addEventListener("click", () => inyectPartialEJS ("profileCart", "profileCart"))

async function inyectPartialEJS (url, script){
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
        }

    } catch (error) {
        console.log(error);
    }
}


//Remplazo la Url para simular la busqueda.. no recarga la pagina solo muestra una url distinta
history.replaceState(null, null, fetchURL);