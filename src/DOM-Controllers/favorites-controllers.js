
async function favoritesControlls(event) {
    try {
        console.log("FN: favoritesControlls(event)");
        if (!isLogged) return

        const cardArticle = getParentNode(event, "tarjeta-articulo")
        const productId = cardArticle.querySelector("#productId").value
        const heartIcon = cardArticle.querySelector(".heart-icon")


        const isFavoriteJSON = await fetch(`/favorites/isFavorite/${productId}`)
        const isFavorite = await isFavoriteJSON.json()

        if (!isFavorite) {
            // HANDLER EN CASO QUE SE ADHIERA A FAVORITOS

            const newFavoriteJSON = await fetch('/favorites/addFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            })

            const newFavorite = await newFavoriteJSON.json()


            //configuraciones HTML y CSS en caso de Exito
            if (newFavorite) {
                
                cardArticle.setAttribute("favoriteId", newFavorite.favoriteId)
                heartIcon.style.color = "var(--verde-gotec)"
            }

        } else {
            // HANDLER EN CASO QUE SE ELIMINE DE FAVORITOS

            //verifico que exista el atributo con el favoriteId
            const isFavorite = cardArticle.getAttribute("favoriteId")
            if (!isFavorite) return

            const deleteFavoriteJSON = await fetch('/favorites/deleteFavorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favoriteId: isFavorite })
            })

            const deleteFavorite = await deleteFavoriteJSON.json()

            //Si se elimino correctamente el favorito, le retiro el atributo favoriteId y cambio el CSS
            if (deleteFavorite) {
                cardArticle.removeAttribute("favoriteId")
                heartIcon.style.color = "var(--azul-gotec)"
            }

        }


    } catch (error) {
        console.log(error.message);
    }
}

