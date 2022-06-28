import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []

const principalSearch = document.querySelector('#search')
const ghost = document.querySelector('#noResults')
let searchValue = ''

let Search = () => {

    searchValue = principalSearch.value.trim().toLowerCase()
    let searchArray = []



    if (searchValue.length >= 3) {
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(searchValue) || recipes[i].description.includes(searchValue)) {
                searchArray.push(recipes[i])
            } else {
                for (let r = 0; r < recipes[i].ingredients.length; r++) {
                    if (recipes[i].ingredients[r].ingredient.toLowerCase().includes(searchValue)) {
                        searchArray.push(recipes[i])
                        break
                    }
                    // throw new Error('Aucune recette ne correspond à vos critères de recherche. Vous pouvez chercher « tarte aux pommes»,« poisson », etc')
                }
                document.querySelector('#recettes').innerHTML = searchArray.map(s => s.outerHTML).join('')
                console.log(searchArray)
            } if(searchArray.length == 0) {
                    ghost.classList.remove('hidden')
                }

        }
        
    }

}

principalSearch.addEventListener('input', Search)

