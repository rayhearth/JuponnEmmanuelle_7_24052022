import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []
let ing = recipes.map(i => i.ingredients.map(n => n.ingredient))
ing = ing + ''
//transforme string en array  
let ingData = ing.split(',')
//uniformise caract
const lowIngData = ingData.map(el => {
    return el.toLowerCase()
})
let ingredientsArray = [...new Set(lowIngData)].sort() // array de tous les ingredients filtrés
// console.log(ingredientsArray)
/*traitement app*/

const principalSearch = document.querySelector('#search')
const ingSearch = document.querySelector('#ingredients')
const ghost = document.querySelector('#noResults')
let searchValue = ''
let ingValue =''

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
            //on parcour l'array obtenu et on instancie notre clss recipeCard
            const replace = searchArray.map(s => new RecipeCard(s))
            //on cree une méthode qui va gérer le html de toutes les ecttes trouvées
            const visualAll = (searchArray) => {
                let all = ''
                for (let searching of searchArray) {
                    all += searching.renderRecipe()
                }
                return all
            }
            document.querySelector('#recettes').innerHTML = visualAll(replace)
            //s'il n'y a pas de recette on fait app le mess no result sinon il estt caché
            if (searchArray.length == 0) {
                ghost.classList.remove('hidden')
            } else {
                ghost.classList.add('hidden')
            }
        }
    }
}

principalSearch.addEventListener('input', Search)

let searchFilter = () => {

    ingValue = ingSearch.value.trim().toLowerCase()
    let ingfiltered = []

    if (ingValue.length >= 3) {
        for (let i = 0; i < ingredientsArray.length; i++) {
            if (ingredientsArray[i].toLowerCase().includes(ingValue)) {
                ingfiltered.push(ingredientsArray[i])
                console.log(ingfiltered)
            }

            const recipesIng = ingfiltered.map(i => new RecipeCard(i))

            const allFilterI = (ingfiltered) => {
                let all = ''
                for (let ing of ingfiltered) {
                    all += ing.renderRecipe()
                }
                return all
            }
            document.querySelector('#recettes').innerHTML = allFilterI(recipesIng)
        }
    }
}

ingSearch.addEventListener('input',searchFilter)
