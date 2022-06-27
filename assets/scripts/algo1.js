import recipes from './recipes.js'

recipes: []
const principalSearch = document.querySelector('#search')

const Search = () => {

    searchValue = principalSearch.value.trim()
    let searchArray = []



    if (searchValue.length >= 3) {
        for (let recipe of recipes) {
            if (recipe.name.toLocaleLowerCase().includes(searchValue) ||
                recipe.description.includes(searchValue) ||
                recipe.ingredients.forEach((ingredient) => {
                    ingredient.toLocaleLowerCase().includes(searchValue)
                }) || recipe.appiance.includes(searchValue) ||
                recipe.ustensils.includes(searchValue)
            )
            searchArray.push(recipe)
            searchArray = recipes
        }
        if (searchArray.length == 0) {
            return `<div class="noResults hidden">
                <p> Aucune recette ne correspond à vos critères de recherche.<br>Vous pouvez chercher « tarte aux pommes
                »,« poisson », etc.</p>
                </div>`

        }
    }

}

principalSearch.addEventListener('input', Search)

