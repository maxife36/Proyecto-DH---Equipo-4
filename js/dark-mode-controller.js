// ----------------Selectores de elementos del DOM

const darkModeInput = document.querySelector("#dark-mode-input")

const infoContainer = document.querySelector(".header-info-container")

const headerContainer = document.querySelector(".header-main-container")
const navContainer = document.querySelector(".header-nav")

const menuContainer = document.querySelectorAll(".menu-container")
const subMenuContainer = document.querySelectorAll(".sub-menu-container")

const footerContainer = document.querySelector(".main-footer")
const footerCopyright = document.querySelector(".footer-copyright-section")
const footerCarousel = document.querySelector(".carousel-brand-container")



// ----------------Colores Predefinidos

const infoContainerBckColor = window.getComputedStyle(infoContainer).backgroundColor
const headerContainerBck = window.getComputedStyle(headerContainer).background
const navContainerBckColor = window.getComputedStyle(navContainer).backgroundColor
const menuContainerColor = window.getComputedStyle(menuContainer[0]).color
const subMenuContainerBckColor = window.getComputedStyle(subMenuContainer[0]).backgroundColor
const subMenuContainerColor = window.getComputedStyle(subMenuContainer[0]).color
const footerContainerBckColor = window.getComputedStyle(footerContainer).background
const footerCopyrightColor = window.getComputedStyle(footerCopyright).color
const footerCarouselBorderTop = window.getComputedStyle(footerCopyright).borderTop
const footerCarouselBorderBottom = window.getComputedStyle(footerCopyright).borderBottom


darkModeInput.addEventListener("change",()=>{
    if (darkModeInput.checked) {
        infoContainer.style.backgroundColor = "#2b2b2b"
        headerContainer.style.background = "linear-gradient(-25deg,#2b2b2b 20% ,#696969 50%,#2b2b2b 80%)";
        navContainer.style.backgroundColor = "#2b2b2b"
        menuContainer.forEach(el => el.style.color = "#ebebeb");
        subMenuContainer.forEach(el => el.style.backgroundColor = "#3b3b3b");
        subMenuContainer.forEach(el => el.style.color = "#ebebeb");
        footerContainer.style.background = "linear-gradient(#2b2b2b 40%,#696969)"
        footerCopyright.style.color = "#ebebeb"
        footerCarousel.style.borderTop = "1px solid #ebebeb"
        footerCarousel.style.borderBottom = "1px solid #ebebeb"
    }else{
        infoContainer.style.backgroundColor = infoContainerBckColor
        headerContainer.style.background = headerContainerBck
        navContainer.style.backgroundColor = navContainerBckColor
        menuContainer.forEach(el => el.style.color = menuContainerColor);
        subMenuContainer.forEach(el => el.style.backgroundColor = subMenuContainerBckColor);
        subMenuContainer.forEach(el => el.style.color = subMenuContainerColor);
        footerContainer.style.background = footerContainerBckColor;
        footerCopyright.style.color = footerCopyrightColor
        footerCarousel.style.borderTop = footerCarouselBorderTop
        footerCarousel.style.borderBottom = footerCarouselBorderBottom
    }

})
