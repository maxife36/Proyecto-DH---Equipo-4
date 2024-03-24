async function profileCartDeleteProduct(event) {
    if (!isLogged) return

    try {
        const target = event.target

        let productCard = target.parentNode

        const cartProductId = productCard.querySelector("#cartProductId").value

        const apiURL = `/cart/deleteProduct/${cartProductId}`

        const resultJSON = await fetch(apiURL, {
            method: 'DELETE'
        })
        const result = await resultJSON.json()

        if (!result[0]) return console.log(result[1]);// si no se elimina de la base de dato, no permito que se elimine del container

        productCard.remove()

        updateProfileCartTotal()

    } catch (err) {
        console.log("ERROR fn : deleteProduct ", err.message);
    }
}

async function profileCartUpdateProduct(event, quantityParam) {
    if (!isLogged) return

    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".profileCart-quantity-input")
    const cartProductId = productCard.querySelector("#cartProductId").value
    const productId = productCard.querySelector("#productId").value
    const productSubTotal = productCard.querySelector(".profileCart-product-subtotal")
    const quantity = quantityParam ? quantityParam : Number(inputQuantity.value)

    if (!quantity || quantity <= 0) quantity = 1

    const updateData = {
        cartProductId,
        productId,
        currentQuantity: quantity,
    };

    const resultJSON = await fetch("/cart/updateQuantity", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    })

    const result = await resultJSON.json()

    if (!result[0] && result[1] === "No hay stock") {
        inputQuantity.style.border = "1px solid Red"
        inputQuantity.style.color = "Red"
        return
    }
    
    if (!result[0]) return console.log(result[1]);// si no se modifica en la base de dato, no permito que se cambie sus datos en el front 

    inputQuantity.value = result[1].quantity
    productSubTotal.textContent = (result[1].total).toFixed(2)
    inputQuantity.style.border = "1px solid var(--gris-intermedio-gotec)"
    inputQuantity.style.color = "var(--verde-masOscuro-gotec)"

    updateProfileCartTotal()

}

function profileCartChangeQuantity(event, action) {
    if (!isLogged) return

    const productCard = event.target.parentNode.parentNode
    const inputQuantity = productCard.querySelector(".profileCart-quantity-input")
    let quantity = Number(inputQuantity.value)

    if (quantity && quantity >= 1) {
        if (action) {
            quantity++
        } else {
            quantity--
        }

        profileCartUpdateProduct(event, quantity)

    }
}

function profileCartEnterAction(event) {
    const inputQuantity = event.target
    inputQuantity.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let quantity = Number(inputQuantity.value)

            if (quantity && quantity >= 1) profileCartUpdateProduct(event, quantity)

        }
    })
}

function profileCartShippingDisplay() {

}

function updateProfileCartTotal() {
    const allProductsTotals = document.querySelectorAll(".profileCart-product-subtotal")
    const profileCartShippingTotal = document.querySelector("#profileCartShippingTotal")
    const totalCart = document.querySelector(".profileCart-total")

    let totalProducts = 0

    if (allProductsTotals.length) {
        const allProductsPrice = []

        for (const pObj of allProductsTotals) {
            allProductsPrice.push(Number(pObj.textContent))
        }

        totalProducts = allProductsPrice.reduce((acum, value) => {
            return acum + value
        }, 0);
    }

    const shippingTotal = profileCartShippingTotal ? profileCartShippingTotal.value : 0

    totalCart.textContent = (Number(totalProducts) + Number(shippingTotal)).toFixed(2)

}

//Ejecuto esta funcion para que actualice el total del carrito en la primer carga

updateProfileCartTotal()

/*  CONFIGURACION DEL MAPA LEAFET */

const profileCartShippingBtn = document.querySelector("#profileCartShippingBtn")
const profileCartPaymentBtn = document.querySelector("#profileCartPaymentBtn")
const modalMappBackground = document.querySelector(".modalMapp-background")

const pickupCoords = {
    oca: {
        lat: -27.778042262966565,
        lng: -64.26787961025269,
        title: "OCA SRL"
    },
    andreani: {
        lat: -27.788891927602023,
        lng: -64.2617887489563,
        title: "Andreani"
    },
    correoArgSgo: {
        lat: -27.787877303545834,
        lng: -64.25623976550744,
        title: "Correo Arg. Sgo. del Estero"
    },
    correoArgBanda: {
        lat: -27.734103579415624,
        lng: -64.24240627786992,
        title: "Correo Arg. La Banda"
    },
}

profileCartShippingBtn.addEventListener("click", () => {
    profileCartMapGenerator("Punto de Recolección")
})

function profileCartMapGenerator() {
    modalMappBackground.style.width = "100vw"
    modalMappBackground.style.height = "100vh"
    modalMappBackground.innerHTML = `
    <section class="mapContainer flx-c-nw">
        <i class="fa-solid fa-x" id="mapExit"></i>

        <div class="profileCartShippingContainer flx-r-nw">
            <input type="hidden" name="shippingDistance" id="profileCartshippingDistance">
            <input type="hidden" id="profileCartShippingTotal" value="0"></input>

            <p class="mapTitle flx-r-nw" id="profileCartMap">Envío</p>
            <div class="flx-c-nw" style="position: relative">
                <div class="flx-r-nw"> 
                    <input type="radio" id="storePickup" value="storePickup" name="shippingWay" checked>
                    <label for="StorePickup">Retiro sin Cargo</label>
                </div>
                <input type="text" id="pickupPlace" name="pickupPlace" value="OCA SRL" disabled>
            </div>
   
            <div class="flx-c-nw">
                <div class="flx-r-nw">
                    <input type="radio" id="homeDelivery" value="homeDelivery" name="shippingWay">
                    <label for="homeDelivery">Envio a Domicilio</label>
                </div>
            </div>
        </div>

        <div id="pickupMap"></div>
    </section>
    `
    //Selectores
    const DOMpickupPlace = document.querySelector("#pickupPlace")
    const closeBtnMap = document.querySelector("#mapExit")

    const inputStorePickup = document.querySelector("#storePickup")
    const inputHomeDelivery = document.querySelector("#homeDelivery")

    const profileCartShippingContainer = document.querySelector(".profileCartShippingContainer")
    const profileCartShippingDistance = document.querySelector("#profileCartshippingDistance")
    const profileCartshippingCost = document.querySelector("#profileCartshippingCost")
    const profileCartShippingTotal = document.querySelector("#profileCartShippingTotal")


    //Defino cual es el div que contendra el mapa pasando su div id
    const pickupMap = L.map("pickupMap")

    //Establezco que tipo de mapa se usara y se lo agrega al mapa
    const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tileLyer = L.tileLayer(tileURL, { maxZoom: 17, minZoom: 7 })

    tileLyer.addTo(pickupMap);

    //Pido permisos para utilizar el geolocalizador del navegador y establezco coordenadas segun su posicion
    pickupMap.locate({ enableHightAccuray: true })

    pickupMap.on("locationfound", event => {
        const coords = [event.latitude, event.longitude]
        pickupMap.setView([-27.802464, -64.256750], 13)
    })

    //En caso de no dar permiso el mapa se centra en coordenada spor defecto
    pickupMap.on("locationerror", e => {
        // Coordenadas por defecto
        const defaultCoords = [-27.761248, -64.252999];
        pickupMap.setView(defaultCoords, 12.5);
    });

    //creo grupo de marcadores y lo configuro en el for
    const markerGroup = L.layerGroup();

    for (const pickupPlace in pickupCoords) {
        const pickupObj = pickupCoords[pickupPlace]

        const marker = L.marker([pickupObj.lat, pickupObj.lng])
        marker.bindTooltip(pickupObj.title).openTooltip()
        //agrego al grupo de marcadores
        markerGroup.addLayer(marker)

        //Agrego listener por cada amarcador
        marker.on('click', function (e) {
            // Recuperar la posición y titulo del marcador
            const position = marker.getLatLng();
            const title = marker.getTooltip().getContent();

            DOMpickupPlace.value = title
            DOMpickupPlace.style.width = "auto"
            DOMpickupPlace.style.padding = "1.5px 3px"
            DOMpickupPlace.style.border = "1px solid var(--gris-intermedio-gotec)"



            //Actualizacion de distancia de envio
            profileCartShippingDistance.value = 0
            profileCartshippingCost.value = 0

            //Actualizacion del valor de envio
            profileCartShippingTotal.value = 0

            updateProfileCartTotal()
        })
    }
    //agrego el grupo de marcadores al mapa
    markerGroup.addTo(pickupMap)

    //Establezco listener para cerrar el modal


    closeBtnMap.addEventListener("click", () => {
        modalMappBackground.style.width = "0px"
        modalMappBackground.style.height = "0px"
        closeBtnMap.style.display = "none"
        profileCartShippingContainer.style.display = "none"
    })

    const data = {
        pickupMap,
        markerGroup,
        DOMpickupPlace,
        inputStorePickup,
        inputHomeDelivery,
        profileCartShippingContainer,
        profileCartShippingDistance,
        profileCartshippingCost,
        profileCartShippingTotal
    }

    inputStorePickup.addEventListener("click", (event) => storePickupListener(event, data))
    inputHomeDelivery.addEventListener("click", (event) => homeDeliveryListener(event, data))

    return pickupMap
}

function storePickupListener(event, data) {
    const { pickupMap, markerGroup, DOMpickupPlace, profileCartShippingDistance, profileCartshippingCost, profileCartShippingTotal } = data

    const target = event.target

    if (target.checked) {

        pickupMap.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                pickupMap.removeLayer(layer);
            }
        });

        pickupMap.off("click")

        
        DOMpickupPlace.style.width = "auto"
        DOMpickupPlace.style.padding = "1.5px 3px"
        DOMpickupPlace.style.border = "1px solid var(--gris-intermedio-gotec)"

        for (const pickupPlace in pickupCoords) {
            const pickupObj = pickupCoords[pickupPlace]

            const marker = L.marker([pickupObj.lat, pickupObj.lng])
            marker.bindTooltip(pickupObj.title).openTooltip()

            //agrego al grupo de marcadores
            markerGroup.addLayer(marker)

            //Agrego listener por cada amarcador
            marker.on('click', function (e) {
                // Recuperar la posición y titulo del marcador
                const position = marker.getLatLng();
                const title = marker.getTooltip().getContent();

                DOMpickupPlace.value = title

                //Actualizacion de distancia de envio
                profileCartShippingDistance.value = 0
                profileCartshippingCost.value = 0

                //Actualizacion del valor de envio
                profileCartShippingTotal.value = 0

                updateProfileCartTotal()
            })

            if(pickupObj.title === "OCA SRL") marker.fire('click')

        }
        //agrego el grupo de marcadores al mapa
        markerGroup.addTo(pickupMap)
    }
}

function homeDeliveryListener(event, data) {
    const { pickupMap, markerGroup, DOMpickupPlace, inputStorePickup, inputHomeDelivery, profileCartShippingContainer, profileCartShippingDistance, profileCartshippingCost, profileCartShippingTotal } = data

    const target = event.target

    if (target.checked) {
        DOMpickupPlace.value = ""
        DOMpickupPlace.style.width = 0
        DOMpickupPlace.style.padding = 0
        DOMpickupPlace.style.border = "0px solid var(--gris-intermedio-gotec)"

        markerGroup.clearLayers()

        // Agrego un marcador para la ubicación inicial
        const defaultMarker = L.marker([-27.847419, -64.265505])

        // variable que guardara la lat y long del pin que coloque el usuario, su respectivo marcador, y la distancia con el maracdoir por defecto
        let userLatLng = null
        let userMarker = null
        let shippingDistance = 0

        //Flag de control para que se pueda colcoar un solo marker
        let markerFlag = false

        // Agregar un control de click para colocar marcadores
        pickupMap.on('click', function (event) {
            if (markerFlag) userMarker.remove()

            userLatLng = event.latlng;
            userMarker = L.marker(userLatLng).addTo(pickupMap);

            // Calculo la distancia entre el marcador del usuario y el marcador por defecto
            shippingDistance = defaultMarker.getLatLng().distanceTo(userLatLng) / 1000; // Convierto a kilómetros
            profileCartShippingDistance.value = shippingDistance


            //Calculo del precio de envio
            const shippingPrice = shippingCalculator(shippingDistance)
            profileCartshippingCost.value = shippingPrice
            //Actualizacion del valor de envio
            profileCartShippingTotal.value = shippingPrice.toFixed(2)

            updateProfileCartTotal()

            markerFlag = true

        });
    }
}

function shippingCalculator(distance) {
    if (distance <= 300) {
        // Parte lineal
        const pendiente = (5000 - 800) / 300;
        const precio = pendiente * distance + 800;
        return Math.max(precio, 800);
    } else if (distance <= 1000) {
        // Parte lineal
        const pendiente = (10000 - 5000) / 1000;
        const precio = pendiente * distance + 5000;
        return Math.max(precio, 5000);
    } else if (distance <= 2000) {
        // Parte lineal
        const pendiente = (18000 - 10000) / 2000;
        const precio = pendiente * distance + 10000;
        return Math.max(precio, 10000);
    } else {
        return 20000;
    }
}

