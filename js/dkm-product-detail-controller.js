// ----------------Selectores de elementos del DOM

const dkmInputProductDetail = document.querySelector("#dark-mode-input")

const likeIcon = document.querySelector(".like-img-icon")
const restQuantity = document.querySelector(".rest-quantity")
const userComentIcon= document.querySelectorAll(".user-coment-icon")
const userScore = document.querySelectorAll(".user-score")
const userScoreImg = document.querySelectorAll(".score-star")



// ----------------Colores Predefinidos

const likeIconBckColor = window.getComputedStyle(likeIcon).backgroundColor
const restQuantityColor = window.getComputedStyle(restQuantity).color
const userComentIconBckColor = window.getComputedStyle(userComentIcon[0]).backgroundColor
const userComentIconColor = window.getComputedStyle(userComentIcon[0]).color
const textScoreColor = window.getComputedStyle(userScore[0]).color
const userScoreImgBckColor = window.getComputedStyle(userScoreImg[0]).backgroundColor


dkmInputProductDetail.addEventListener("change",()=>{
    if (darkModeInput.checked) {
        likeIcon.style.backgroundColor = "#1f3566"
        restQuantity.style.color = "#1f3566"
        userComentIcon.forEach(el => el.style.background = "#1f3566");
        userComentIcon.forEach(el => el.style.color = "#fff");
        userScore.forEach(el => el.style.color = "#fff");
        userScoreImg.forEach(el => el.style.background = "#1f3566");
    }else{
        likeIcon.style.backgroundColor = likeIconBckColor
        restQuantity.style.color = restQuantityColor
        userComentIcon.forEach(el => el.style.background = userComentIconBckColor);
        userComentIcon.forEach(el => el.style.color = userComentIconColor);
        userScore.forEach(el => el.style.color = textScoreColor);
        userScoreImg.forEach(el => el.style.background = userScoreImgBckColor);
    }

})
