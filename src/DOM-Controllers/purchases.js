function displayPurchaseDetail(event){
    const purchaseDetailBtn = event.target
    const displayFlag = purchaseDetailBtn.dataset.display === "true"? true : false 

    const purchaseGeneralData = purchaseDetailBtn.parentNode
    const purchaseDetail = purchaseGeneralData.nextElementSibling
    const allItemData = purchaseDetail.querySelectorAll(".itemData")
    
    if (!displayFlag ) {
        purchaseDetailBtn.style.transform = "rotate(180deg)"
        allItemData.forEach(itemData => {
            itemData.style.height = "40px"
            itemData.style.borderBottom = "solid 1px var(--gris-intermedio-gotec)"
            itemData.style.opacity = 1
            itemData.style.pointerEvents = "auto"
        });
    }else{
        purchaseDetailBtn.style.transform = "rotate(0deg)"

        allItemData.forEach(itemData => {
            itemData.style.height = "0px"
            itemData.style.borderBottom = "solid 0px var(--gris-intermedio-gotec)"
            itemData.style.opacity = 0
            itemData.style.pointerEvents = "none"
        });

    }

    purchaseDetailBtn.dataset.display = !displayFlag
}