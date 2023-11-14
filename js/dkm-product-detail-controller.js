// ----------------Selectores de elementos del DOM

const dkmInputProductDetail = document.querySelector("#dark-mode-input")

const htmlElement = document.documentElement

const likeIcon = document.querySelector(".like-img-icon")
const restQuantity = document.querySelector(".rest-quantity")
const userComentIcon= document.querySelectorAll(".user-coment-icon")
const userScoreImg = document.querySelectorAll(".score-star")



// ----------------Colores Predefinidos

const verdeGotec = getComputedStyle(htmlElement).getPropertyValue("--verde-gotec");

const likeIconBckColor = window.getComputedStyle(likeIcon).backgroundColor
const restQuantityColor = window.getComputedStyle(restQuantity).color
const userComentIconBckColor = window.getComputedStyle(userComentIcon[0]).backgroundColor
const userComentIconColor = window.getComputedStyle(userComentIcon[0]).color
const userScoreImgBckColor = window.getComputedStyle(userScoreImg[0]).backgroundColor
const userScoreImgColor = window.getComputedStyle(userScoreImg[0]).color


dkmInputProductDetail.addEventListener("change",()=>{
    if (darkModeInput.checked) {
        htmlElement.style.setProperty("--verde-gotec", "#1f3566")
        likeIcon.style.backgroundColor = "#1f3566"
        restQuantity.style.color = "#1f3566"
        userComentIcon.forEach(el => el.style.background = "#1f3566");
        userComentIcon.forEach(el => el.style.color = "#fff");
        userScoreImg.forEach(el => el.style.background = "#1f3566");
        userScoreImg.forEach(el => el.style.color = "#fff");
    }else{
        htmlElement.style.setProperty("--verde-gotec", verdeGotec)
        likeIcon.style.backgroundColor = likeIconBckColor
        restQuantity.style.color = restQuantityColor
        userComentIcon.forEach(el => el.style.background = userComentIconBckColor);
        userComentIcon.forEach(el => el.style.color = userComentIconColor);
        userScoreImg.forEach(el => el.style.background = userScoreImgBckColor);
        userScoreImg.forEach(el => el.style.color = userScoreImgColor);
    }

})
