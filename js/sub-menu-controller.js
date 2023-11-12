const allMenueTitles = document.querySelectorAll(".menu-title")

const subMenuController = (menuTitle) =>{
    allMenueTitles.forEach(el =>{
        const elStatus = el.attributes.status.value
        const elSubmenu = el.nextElementSibling

        if (el === menuTitle) {
            if (elStatus === "true") {
                elSubmenu.style.display ="none"
                el.attributes.status.value ="false"
            }else{
                elSubmenu.style.display ="flex"
                el.attributes.status.value = "true"
            } 
        }else{
            elSubmenu.style.display ="none"
            el.attributes.status.value = "false"
        }
    })

}
