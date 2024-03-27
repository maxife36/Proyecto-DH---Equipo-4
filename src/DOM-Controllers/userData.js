const formUserInfo = document.querySelector(".userDataConatiner")
const allFormInputs = formUserInfo.querySelectorAll("input")
const imgInput = formUserInfo.querySelector("#add-img")
const profileImg = formUserInfo.querySelector("#profileImg")

const btnsNavConatiner = document.querySelector('.btnsNavConatiner');
const btnsNavConatinerHeight = parseInt(window.getComputedStyle(btnsNavConatiner).height)
const navConatinerTop = btnsNavConatiner.getBoundingClientRect().top;
const windowHeight = window.innerHeight

let footer = null
let footerTop = null

// window.addEventListener("scroll", navContainerSticky)

document.addEventListener('DOMContentLoaded', () => {
    footer = document.querySelector('footer');
    footerTop = footer.getBoundingClientRect().top;
});

function navContainerSticky() {
    const windowTop = window.scrollY
    const windowBottom = windowTop + windowHeight

    if (windowTop >= navConatinerTop && windowBottom < footerTop) {
        btnsNavConatiner.style.top = `${windowTop - navConatinerTop}px`
    } else {
        btnsNavConatiner.style.top = 0
    }
}

///Habilitar el form

//Informacion Original de los inputs
let originalFullname = null
let originalBirthday = null
let originalAdress = null
let originalProfileImg = null


function editInfoBtn(event) {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const profileImgConatiner = formUserInfo.querySelector(".profile-img-container")
    const allFormInputs = formUserInfo.querySelectorAll("input")

    profileImgConatiner.style.opacity = 1
    originalProfileImg = profileImg.src

    allFormInputs.forEach(input => {
        if (input.id === "fullName") originalFullname = input.value
        if (input.id === "userBirthday") originalBirthday = input.value
        if (input.id === "userAdress") originalAdress = input.value

        if (input.id !== "userEmail") {
            input.removeAttribute("disabled")
            input.style.color = "var(--gris-oscuro-gotec)"
        }
    });
}

function cancelInfoBtn(event) {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const profileImgConatiner = formUserInfo.querySelector(".profile-img-container")
    const allFormInputs = formUserInfo.querySelectorAll("input")

    profileImgConatiner.style.opacity = 0.8
    profileImg.src = originalProfileImg

    allFormInputs.forEach(input => {
        if (input.id === "fullName") input.value = originalFullname
        if (input.id === "userBirthday") input.value = originalBirthday
        if (input.id === "userAdress") input.value = originalAdress

        input.setAttribute("disabled", "disabled")
        input.style.color = "var(--gris-intermedio-gotec)"
    });
}

function saveInfoBtn() {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const firstInput = formUserInfo.querySelector("input")

    const isDisabled = firstInput.getAttribute("disabled")

    if (isDisabled === null) formUserInfo.submit()
}

function formatImgChecker(InputImg){

    let checkFlag = false

    const supportedFormats = ["jpg", "jpeg", "png"]

    let typeImg = InputImg.files[0].type.slice(6)

    supportedFormats.forEach(el => { el === typeImg ? checkFlag = true : "" })

    return checkFlag
}

imgInput.addEventListener("change", () => {

    if (imgInput.files.length > 0) {

        if (formatImgChecker(imgInput)) {

            const url = URL.createObjectURL(imgInput.files[0]);

            profileImg.src = url

        } else {
            window.alert("Formato de imagen no soportado")
        }
    } else {
        window.alert("No ingreso niguna imagen")
    }
})