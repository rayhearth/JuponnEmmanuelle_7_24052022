import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []

let ing = recipes.map(i => i.ingredients.map(n => n.ingredient.toLowerCase()))
ing = ing + ''
//transforme string en array  
let ingData = ing.split(',')
let ingredientsArray = [...new Set(ingData)].sort() 

/*traitement app*/

const principalSearch = document.querySelector('#search')
let searchValue = ''

const ingSearch = document.querySelector('#ingredients')
let ingValue = ''

//const ou est stocke la div no result
const ghost = document.querySelector('#noResults')

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
                        break;
                    }
                }
            }
            // recipes.splice(0,recipes.length,...searchArray)
            // console.log(recipes)

            /*MAJ des liste en fonction du résultat de la recherche principale*/
            let ingFiltered = searchArray.map(i => i.ingredients.map(n => n.ingredient.toLowerCase()))
            ingFiltered = ingFiltered + ''
            let iFiltredData = ingFiltered.split(',')
            let newIngredientArray = [...new Set(iFiltredData)].sort()

            let appFiltered = searchArray.map(a => a.appliance.toLowerCase())
            let newApplianceArray = [...new Set(appFiltered)].sort()

            let ustFistered = searchArray.map(u => u.ustensils.toString().toLowerCase())
            ustFistered = ustFistered + ''
            let uFilteredData = ustFistered.split(',')
            let newUstensilsArray = [...new Set(uFilteredData)].sort()

            /* Création des recipes cards en fonction du resultat de la recherche*/
            //on parcour l'array obtenu et on instancie notre class recipeCard
            const results = searchArray.map(s => new RecipeCard(s))
            // console.log(searchArray)
            //on cree une méthode qui va gérer le html de toutes les ecttes trouvées
            const visualAll = (searchArray) => {
                let all = ''
                for (let searching of searchArray) {
                    all += searching.renderRecipe()
                }
                return all
            }
            document.querySelector('#recettes').innerHTML = visualAll(results)
            //s'il n'y a pas de recette on fait app le mess no result sinon il est caché
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
                // console.log(ingfiltered)
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

ingSearch.addEventListener('input', searchFilter)
