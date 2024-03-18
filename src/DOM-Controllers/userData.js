const formUserInfo = document.querySelector(".userDataConatiner")
const allFormInputs = formUserInfo.querySelectorAll("input")

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
function editInfoBtn(event) {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const allFormInputs = formUserInfo.querySelectorAll("input")
    allFormInputs.forEach(input => {
        if (input.id !== "userEmail") {
            input.removeAttribute("disabled")
            input.style.color = "var(--gris-oscuro-gotec)"
        }
    });
}

function cancelInfoBtn(event) {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const allFormInputs = formUserInfo.querySelectorAll("input")
    allFormInputs.forEach(input => {
        input.setAttribute("disabled", "disabled")
        input.style.color = "var(--gris-intermedio-gotec)"
    });
}

//Permite controlar que no se envie el formulario en caso de estar deshabilitado
// formUserInfo.addEventListener("submit", saveInfoBtn)

function saveInfoBtn() {
    const formUserInfo = document.querySelector(".userDataConatiner")
    const firstInput = formUserInfo.querySelector("input")

    const isDisabled = firstInput.getAttribute("disabled")

    if (isDisabled === null) formUserInfo.submit()
}


