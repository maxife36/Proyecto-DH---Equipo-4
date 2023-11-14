//------------------DOM Elements---------------------- 

//-----Personal Information

const inputProfileImg = document.querySelector("#add-img")
const customProfileImg= document.querySelector("#profile-img")

const inputFullName = document.querySelector("#full-Name")
const labelFullName = document.querySelector(".full-name-label")

const inputEmail = document.querySelector("#user-Email")
const labelEmail = document.querySelector(".user-email-label")

const inputBirthday = document.querySelector("#user-Birthday")
const labelBirthday = document.querySelector(".user-birthday-label")

//-----User Profile

const inputUserName = document.querySelector("#user-Name")
const labelUserName = document.querySelector(".user-name-label")

const inputPass = document.querySelector("#user-password")
const labelPass = document.querySelector(".user-password-label")

const inputConfirmPass = document.querySelector("#user-confirm-pass")
const labelConfirmPass = document.querySelector(".user-confirm-pass-label")

//-----Default Style Props

const labelsColor = "#666"
const inputsBorderColor = "#c0c0c0"

//-----Custome Style Props

const ErrorLabelsColor = "#f00"
const ErrorInputsBorderColor = "#f008"

//-----Inputs RegEx

const fullNameRegex = /^[a-zA-Z0-9\s]+$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const userNameRegex = /^[a-zA-Z0-9._-]{6,16}$/
const passwordRegex = /^(?=.+[a-z])(?=.+[A-Z])(?=.+\d)(?=.+[\.@$!%*?&])[A-Za-z\d\.@$!%*?&]{8,}$/

//------------------Verification Functions---------------------- 

const formatImgChecker = (InputImg) => {

  let checkFlag = false

  const supportedFormats= ["jpg", "jpeg", "png"]

  let typeImg = InputImg.files[0].type.slice(6)

  supportedFormats.forEach(el => {el === typeImg? checkFlag = true : ""})

  return checkFlag
}

const textInputsChecker = (inputDomElement,labelDomElement, regEx) => {

  let checkFlag = true

  const inputValue = inputDomElement.value

  if (inputValue) {

    if(!regEx.test(inputValue)){
      checkFlag = false
      labelDomElement.style.color = ErrorLabelsColor 
      inputDomElement.style.borderColor = ErrorInputsBorderColor 
     }else{
      labelDomElement.style.color = labelsColor
      inputDomElement.style.borderColor = inputsBorderColor
    }

  }else{
    labelDomElement.style.color = labelsColor
    inputDomElement.style.borderColor = inputsBorderColor
  }

  return checkFlag
}

//------------------CHANGE Event Listeners---------------------- 

/* window.alert("Caracteres Permitidos:\n   -> Mayuculas\n   -> Minusuclas\n   -> Números") */

//-----Personal Information

inputProfileImg.addEventListener("change", ()=>{

  if (inputProfileImg.files.length > 0) {

    if (formatImgChecker(inputProfileImg)) {

      const url = URL.createObjectURL(inputProfileImg.files[0]);

      customProfileImg.src = url 

    } else{
      window.alert("Formato de imagen no soportado")
    }
  }else{
    window.alert("No ingreso niguna imagen")
  }
})

inputFullName.addEventListener("change", () => textInputsChecker(inputFullName,labelFullName,fullNameRegex))

inputEmail.addEventListener("change", () => textInputsChecker(inputEmail,labelEmail,emailRegex))

inputBirthday.addEventListener("change", () => {
  const inputDate = new Date(inputBirthday.value)
  const currentDate = new Date()
  
  const age = (currentDate - inputDate) / (1000 * 60 * 60 * 24 * 365.25)

  if (inputDate.getFullYear()) {

    if (age < 18) {

      labelBirthday.style.color = ErrorLabelsColor 
      inputBirthday.style.borderColor = ErrorInputsBorderColor 

    }else{

      labelBirthday.style.color = labelsColor
      inputBirthday.style.borderColor = inputsBorderColor
    }

  }else{
    labelBirthday.style.color = ErrorLabelsColor 
    inputBirthday.style.borderColor = ErrorInputsBorderColor 
  }
})

//-----User Profile

inputUserName.addEventListener("change", () => textInputsChecker(inputUserName,labelUserName,userNameRegex))

inputPass.addEventListener("change", () => textInputsChecker(inputPass,labelPass,passwordRegex))

inputConfirmPass.addEventListener("change", () =>{ 
  const pass = inputPass.value;
  const confirmPass = inputConfirmPass.value

  if (pass !== confirmPass) { 
    labelPass.style.color = ErrorLabelsColor 
    labelConfirmPass.style.color = ErrorLabelsColor 
    inputPass.style.borderColor = ErrorInputsBorderColor 
    inputConfirmPass.style.borderColor = ErrorInputsBorderColor 
   }else{
    labelPass.style.color = labelsColor
    labelConfirmPass.style.color = labelsColor
    inputPass.style.borderColor = inputsBorderColor
    inputConfirmPass.style.borderColor = inputsBorderColor
  }

})

//------------------Rules Information Event Listeners---------------------- 

labelFullName.addEventListener("click", ()=>{
  window.alert(
  `Caracteres Permitidos:
    ✔️ Mayúsculas
    ✔️ Minúsculas
    ✔️ Números
  `)
})

labelEmail.addEventListener("click", ()=>{
  window.alert(
  `Estructura Base de Email:
    ✔️ usuario@dominio.extension
  `)
})

labelBirthday.addEventListener("click", ()=>{
  window.alert(
  `Edades permitidas:
    ✔️ Debes ser mayor a 18 años
  `)
})

labelUserName.addEventListener("click", ()=>{
  window.alert(
  `Caracteres Permitidos:
    ✔️ Mayúsculas
    ✔️ Minúsculas
    ✔️ Números 
    ✔️ . _ - (punto - guión bajo - guión medio)
  `)
})
labelPass.addEventListener("click", ()=>{
  window.alert(
  `Caracteres Obligatorios:
    ✔️ Tener al menos 1 Mayúscula
    ✔️ Tener al menos 1 Minúscula
    ✔️ Tener al menos 1 Número
    ✔️ Tener al menos 1 Caracter Especial 
  `)
})

labelConfirmPass.addEventListener("click", ()=>{
  window.alert(
  `Caracteres Obligatorios:
    ✔️ Tener al menos 1 Mayúscula
    ✔️ Tener al menos 1 Minúscula
    ✔️ Tener al menos 1 Número
    ✔️ Tener al menos 1 Caracter Especial 
  `)
})

//------------------Reset Style Btn Event Listeners---------------------- 

const resetBtn = document.querySelector("#reset-btn")

resetBtn.addEventListener("click", ()=>{
  labelFullName.style.color = labelsColor
  inputFullName.style.borderColor = inputsBorderColor
  
  labelEmail.style.color = labelsColor
  inputEmail.style.borderColor = inputsBorderColor
  
  labelBirthday.style.color = labelsColor
  inputBirthday.style.borderColor = inputsBorderColor
  
  labelUserName.style.color = labelsColor
  inputUserName.style.borderColor = inputsBorderColor

  labelPass.style.color = labelsColor
  inputPass.style.borderColor = inputsBorderColor
  
  labelConfirmPass.style.color = labelsColor
  inputConfirmPass.style.borderColor = inputsBorderColor
})

