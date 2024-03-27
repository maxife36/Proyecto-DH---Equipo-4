const userSearchInput = document.querySelector(".profileUserSearchInput")
const allUsers = document.querySelectorAll(".profileCartDataConatiner")

async function inyectPartialEJSInternalDashboard(url, script, subSection) {
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

            const querySubSection = subSection ? `&subSection=${subSection}` : ""
            history.replaceState(null, null, `/users/profile?section=${url}${querySubSection}`);
        }

    } catch (error) {
        console.log(error);
    }
}

async function dashboardUserDetail(event) {
    const target = event.target
    if (target.id != "adminInput" && !target.classList.contains("profileDestroyUser")) {
        const userId = event.target.querySelector("#userId").value
    
        inyectPartialEJSInternalDashboard(`userDetail/${userId}`)
    }
}

async function returnToAllUsers(event) {
    inyectPartialEJSInternalDashboard("allUsers")
}

async function adminController(event){
    const target = event.target

    const adminBtn = target.parentNode.querySelector(".adminBtn")

    const userContainer = getParentNode(event, "profileCartDataConatiner")
    const userId = userContainer.querySelector("#userId").value

    if(target.checked){
        const resultJSON = await fetch("/admin/changePermission", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                userId,
                admin: 1
            })
        })

        const result = await resultJSON.json()

        if (result) {
            adminBtn.style.justifyContent = "flex-end"
            adminBtn.style.backgroundColor = "var(--verde-gotec)"
        }
    }else{
        const resultJSON = await fetch("/admin/changePermission", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                userId,
                admin: 0
            })
        })

        const result = await resultJSON.json()

        if (result) {
            adminBtn.style.justifyContent = "flex-start"
            adminBtn.style.backgroundColor = "var(--verde-gotec)"
        }
    }
}

async function destroyUser(event){
    try {
        const userContainer = event.target.parentNode
        const userId = userContainer.querySelector("#userId").value

        const isSure = confirm("¿Esta seguro que desea eliminar este Usuario con todos sus Registros?")

        if (isSure) {
            const resultJSON = await fetch("/admin/deleteUser",{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId
                })
            })

            const result = await resultJSON.json()

            if (result) {
                userContainer.remove()
            }
        }


    } catch (err) {
        console.log(err.message);
    }
}

userSearchInput.addEventListener("input", (event) => {
    const target = event.target
    const searchedUser = target.value?.toLowerCase()

    if (searchedUser) {
        allUsers.forEach(user => {
            const username = user.querySelector(".userInfoFullname")?.textContent.toLowerCase()

            if (!username.includes(searchedUser)) {
                user.style.display = "none"
            }
        })
    } else {
        allUsers.forEach(user => {
            user.style.display = "flex"
        })
    }

})