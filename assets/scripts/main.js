import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'
import { List } from './models/createLists.js'
import { Tags } from './models/tags.js'

//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')

//inputs
const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')
const principalSearch = document.querySelector('#search')

//ul
const listOfIngredients = document.querySelector('#ingredientsList')
const listOfUstensils = document.querySelector('#ustensilsList')
const listOfAppliances = document.querySelector('#applianceList')



//Création des Array
recipes: [] //array de toutes les recettes
// console.log(recipes)
let ing = recipes.map(i=>i.ingredients)
let ingredientsArray = [...ing] // array de tous les ingredients
let ust = recipes.map(u=>u.ustensils)
let ustensilsArray = [...ust] // array de tous les ustenciles
// console.log(ustensilsArray)
let app = recipes.map(a=>a.appliance)
let appliancesArray = [...app] //array de tous les appareils
// console.log(appliancesArray)

let selectedTags = []
let selectedIngredients = []
let selectedApplainces = []
let selectedUstensils = []
let selectedRecipes = []


// const displayTags = () => {

//     const tagsContainer = recipes.map(t=> new Tags(t))
//     console.log(tagsContainer)
//     tags.innerHTML = renderTags(tagsContainer)
// }
// window.addEventListener('load',displayTags)

const displayLists = () =>{
    const el = recipes.map(l => new List(l))
    console.log(el)
}
window.addEventListener('load',displayLists)

//on injecte le html du render recipe ds notre section recette
const displayRecipes = () =>{
    
    const container = recipes.map(r => new RecipeCard(r))
    // console.log(container)
    const renderAllRecipes = (recipes) => {
        let all = ''
        // console.log(all)
        for (let recipe of recipes){
            all += recipe.renderRecipe()
            // console.log(all)
        }
        return all
    }
    recipesContainer.innerHTML = renderAllRecipes(container)
}

window.addEventListener('load', displayRecipes)

