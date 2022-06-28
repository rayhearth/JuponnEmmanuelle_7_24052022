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
                }
            } 
            const replace = searchArray.map(s => new RecipeCard(s))
            const visualAll = (searchArray) => {
                let all=''
                for (let searching of searchArray){
                    all += searching.renderRecipe()
                }
                return all
            }
            document.querySelector('#recettes').innerHTML = visualAll(replace)
            console.log(searchArray)
            
            if (searchArray.length == 0) {
                ghost.classList.remove('hidden')
            }

        }

    }

}

principalSearch.addEventListener('input', Search)

