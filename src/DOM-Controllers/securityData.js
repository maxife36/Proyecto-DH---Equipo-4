
async function editSecurityBtn(event) {
    //variables para resposicion al cancelar
    const userName = document.querySelector('#userName')
    originalUserName = userName

    fetch("/users/editSecurityData")
    alert('Mail de autorización enviado');
}

async function cancelSecurityBtn(event) {
    const formSecurityInfo = document.querySelector("#securityDataForm")
    const allFormSecurityInputs = formSecurityInfo.querySelectorAll("input")

    const userDataJSON = await fetch("/users/userData?onlyData=true")
    const userData = await userDataJSON.json()

    allFormSecurityInputs.forEach(input => {
        if(input.id === "userName") input.value = userData.username
        if(input.id === "password") input.value = "********"
        if(input.id === "confirmPassword") input.value = "********"

        input.setAttribute("disabled", "disabled")
        input.style.color = "var(--gris-intermedio-gotec)"
    });
}

//Permite controlar que no se envie el formulario en caso de estar deshabilitado
// formSecurityInfo.addEventListener("submit", saveSecurityBtn)

async function saveSecurityBtn() {
    const formSecurityInfo = document.querySelector("#securityDataForm")

    const validateToken = formSecurityInfo.querySelector("#validateToken")
    if (validateToken && validateToken.value) {

        const userName = formSecurityInfo.querySelector("#userName").value
        const password = formSecurityInfo.querySelector("#password").value
        const confirmPassword = formSecurityInfo.querySelector("#confirmPassword").value

        const resultJSON = await fetch("/users/updateSecurityData", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                userName,
                password,
                confirmPassword,
                validateToken: validateToken.value
            })
        })

        if (resultJSON.ok) {
            const result = await resultJSON.text()
            result === "true" ? window.location.href = "/users/login" : null
        }

    }
}


