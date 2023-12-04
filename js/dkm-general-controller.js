let dkMode = false

document.addEventListener("DOMContentLoaded", ()=>{
    dkMode = localStorage.getItem("dkMode")? localStorage.getItem("dkMode") : "false"

    if (dkMode === "true") {
        darkModeInput.checked = true
        dkModeSetting() 
    }  
})


// ----------------Selectores de elementos del DOM

const darkModeInput = document.querySelector("#dark-mode-input")

const htmlElement = document.documentElement

//---header info
const mainHeader = document.querySelector(".header-main")
const infoContainer = document.querySelector(".header-info-container")
const headerContainer = document.querySelector(".header-main-container")

//---header nav
const navContainer = document.querySelector(".header-nav")
const menuContainer = document.querySelectorAll(".menu-container")
const subMenuContainer = document.querySelectorAll(".sub-menu-container")

//---main 
const mainSection = document.querySelector(".main-section")

//---footer
const footerContainer = document.querySelector(".main-footer")
const footerCopyright = document.querySelector(".footer-copyright-section")
const footerCarousel = document.querySelector(".carousel-brand-container")



// ----------------Colores Predefinidos

const verdeGotec = getComputedStyle(htmlElement).getPropertyValue("--verde-gotec");

//---header info
const infoContainerBckColor = window.getComputedStyle(infoContainer).backgroundColor
const mainHeaderBckColor = window.getComputedStyle(mainHeader).backgroundColor
const headerContainerBck = window.getComputedStyle(headerContainer).background
//---header nav
const navContainerBckColor = window.getComputedStyle(navContainer).backgroundColor
const navContainerBorderBottom = window.getComputedStyle(navContainer).borderBottom
const menuContainerColor = window.getComputedStyle(menuContainer[0]).color
const subMenuContainerBck = window.getComputedStyle(subMenuContainer[0]).background
const subMenuContainerColor = window.getComputedStyle(subMenuContainer[0]).color
//---main 
const mainSectionBckColor = window.getComputedStyle(mainSection).backgroundColor
//---footer
const footerContainerBckColor = window.getComputedStyle(footerContainer).background
const footerCopyrightColor = window.getComputedStyle(footerCopyright).color
const footerCarouselBorderTop = window.getComputedStyle(footerCopyright).borderTop
const footerCarouselBorderBottom = window.getComputedStyle(footerCopyright).borderBottom


const dkModeSetting = ()=>{
    htmlElement.style.setProperty("--verde-gotec", "#1f3566")

    //---header info
    infoContainer.style.backgroundColor = "#1b0030"
    mainHeader.style.backgroundColor = "#1b0030";
    headerContainer.style.background = "linear-gradient(-10deg,#1b0030 20%,#1f3566 50%,#1b0030 80%)";
    //---header nav
    navContainer.style.backgroundColor = "#1b0030"
    navContainer.style.borderBottom = "#1b0030"
    menuContainer.forEach(el => el.style.color = "#ebebeb");
    subMenuContainer.forEach(el => el.style.background = "linear-gradient( #1b0030 20%,#1b0030cc 100%)");
    subMenuContainer.forEach(el => el.style.color = "#ebebeb");
    //---main 
    mainSection.style.backgroundColor = "#c0c0c0"
    //---footer
    footerContainer.style.background = "linear-gradient(#1b0030 40%,#1f3566)"
    footerCopyright.style.color = "#ebebeb"
    footerCarousel.style.borderTop = "1px solid #ebebeb"
    footerCarousel.style.borderBottom = "1px solid #ebebeb"
}

const lightModeSetting = ()=>{
    htmlElement.style.setProperty("--verde-gotec", verdeGotec)

    //---header info
    infoContainer.style.backgroundColor = infoContainerBckColor
    mainHeader.style.backgroundColor = mainHeaderBckColor;
    headerContainer.style.background = headerContainerBck
    //---header nav
    navContainer.style.backgroundColor = navContainerBckColor
    navContainer.style.borderBottom = navContainerBorderBottom
    menuContainer.forEach(el => el.style.color = menuContainerColor);
    subMenuContainer.forEach(el => el.style.background = subMenuContainerBck);
    subMenuContainer.forEach(el => el.style.color = subMenuContainerColor);
    //---main 
    mainSection.style.backgroundColor = mainSectionBckColor
    //---footer
    footerContainer.style.background = footerContainerBckColor;
    footerCopyright.style.color = footerCopyrightColor
    footerCarousel.style.borderTop = footerCarouselBorderTop
    footerCarousel.style.borderBottom = footerCarouselBorderBottom
    
}

darkModeInput.addEventListener("change",()=>{
    if (darkModeInput.checked) {
        localStorage.setItem("dkMode", "true")
        dkModeSetting()
    }else{
        localStorage.setItem("dkMode", "false")
        lightModeSetting()
    }

})
