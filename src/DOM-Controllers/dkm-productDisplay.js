// ----------------Selectores de elementos del DOM

const dkmInputProductDetail = document.querySelector("#dark-mode-input")


dkmInputProductDetail.addEventListener("change", () => {
    
    const resetBtn = document.querySelector("#resetBtn") //Ya fue declarado
    const filterDisplayBtn = document.querySelector("#filterBtn") //Ya fue declarado
    const filterTitle = document.querySelector(".filterTitle")
    const paginationControllers = document.querySelector(".paginationControllers") //Ya fue declarado
    const filterSection = document.querySelector(".filterSection") //Ya fue declarado
    const filterArt = filterSection.querySelectorAll(".filterArt")
    const filterArtH4 = filterSection.querySelectorAll("h4") 
    const filterArtSelect = filterSection.querySelectorAll("select") 
    const filterArtRangeInputs = filterSection.querySelectorAll(".rangeInput") 
    
    
    // ----------------Colores Predefinidos
    
    const resetBtnBckColor = window.getComputedStyle(resetBtn).backgroundColor
    const filterDisplayBtnColor = window.getComputedStyle(filterDisplayBtn).color
    const filterDisplayBtnBorder = window.getComputedStyle(filterDisplayBtn).border
    const filterTitleColor = window.getComputedStyle(filterTitle).color
    const paginationControllersColor = window.getComputedStyle(paginationControllers).color
    const filterArtColor = window.getComputedStyle(filterArt[0]).color
    const filterArtH4Color = window.getComputedStyle(filterArtH4[0]).color
    const filterArtSelectColor = window.getComputedStyle(filterArtSelect[0]).color
    const filterArtSelectBorder = window.getComputedStyle(filterArtSelect[0]).border
    const filterArtRangeInputsColor = window.getComputedStyle(filterArtRangeInputs[0]).color
    const filterArtRangeInputsBorder = window.getComputedStyle(filterArtRangeInputs[0]).border
    if (darkModeInput.checked) {

        resetBtn.style.backgroundColor = "var(--violeta-gotec)"
        filterDisplayBtn.style.color = "var(--violeta-gotec)"
        filterDisplayBtn.style.border = "1px solid var(--violeta-gotec)"
        filterTitle.style.color = "var(--violeta-gotec)"
        paginationControllers.style.color = "var(--violeta-gotec)"
        filterArt.forEach(el => el.style.color = "var(--violeta-gotec)");
        filterArtH4.forEach(el => el.style.color = "var(--violeta-gotec)");
        filterArtSelect.forEach(el => el.style.color = "var(--violeta-gotec)");
        filterArtSelect.forEach(el => el.style.border = "0.5px solid var(--violeta-gotec)");
        filterArtRangeInputs.forEach(el => el.style.color = "var(--violeta-gotec)");
        filterArtRangeInputs.forEach(el => el.style.border = "0.5px solid var(--violeta-gotec)");

    } else {

        resetBtn.style.backgroundColor = resetBtnBckColor
        filterDisplayBtn.style.color = filterDisplayBtnColor
        filterDisplayBtn.style.border = filterDisplayBtnBorder
        filterTitle.style.color = filterTitleColor
        paginationControllers.style.color = paginationControllersColor
        filterArt.forEach(el => el.style.color = filterArtColor);
        filterArtH4.forEach(el => el.style.color = filterArtH4Color);
        filterArtSelect.forEach(el => el.style.color = filterArtSelectColor);
        filterArtSelect.forEach(el => el.style.border = filterArtSelectBorder);
        filterArtRangeInputs.forEach(el => el.style.color = filterArtRangeInputsColor);
        filterArtRangeInputs.forEach(el => el.style.border = filterArtRangeInputsBorder);
    }

})
