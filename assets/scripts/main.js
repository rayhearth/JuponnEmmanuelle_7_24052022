import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'
import { IngredientsList, AppliancesList, UstensilsList } from './models/createLists.js'
import { Tags } from './models/tags.js'
import { Search } from './models/Search.js'

//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')

//inputs
const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')
const btnfilter = document.querySelectorAll('.controlExpand')
// console.log(btnfilter)
const principalSearch = document.querySelector('#search')

//ul
const resultIng = document.querySelector('.searchResult')
const listOfIngredients = document.querySelector('#ingredientsList')
const listOfUstensils = document.querySelector('#ustensilsList')
const listOfAppliances = document.querySelector('#applianceList')

const btnTags = document.querySelectorAll('.list-items')

// const research = () =>{
//     let inputValue = ''
//     principalSearch.addEventListener('change', ()=>)
// }

//Création des Array
recipes: [] //array de toutes les recettes
let ing = recipes.map(i => i.ingredients)
let ingredientsArray = [...ing] // array de tous les ingredients
let ust = recipes.map(u => u.ustensils)
let ustensilsArray = [...ust] // array de tous les ustenciles
let app = recipes.map(a => a.appliance)
let appliancesArray = [...app] //array de tous les appareils
console.log(appliancesArray)
// console.log(appliancesArray)

let selectedTags = []
let selectedIngredients = []
let selectedApplainces = []
let selectedUstensils = []
let selectedRecipes = []


// listeners Filters
ingredientFilter.addEventListener('click', (e) => {
    displayIngList()
})

applianceFilter.addEventListener('click', (e) => {
    displayAppList()
})

ustensilFilter.addEventListener('click', (e) => {
    displayUstList()
})


const displayIngList = (e) => {
    const ingList = ingredientsArray.map(i => new IngredientsList(i))
    // console.log(ingList)

    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        for (let ingredient of ingredientsArray) {
            all += ingredient.buildIngredientsList()
            // console.log(all)
        }
        return all
    }
    listOfIngredients.innerHTML = renderAllIngredient(ingList)
    listOfIngredients.classList.add('displayDrop')
    listOfIngredients.style.display = ''
    listOfIngredients.setAttribute('aria-hidden', 'false')
    listOfAppliances.style.display = 'none'
    listOfUstensils.style.display = 'none'
}
window.addEventListener('load', displayIngList)

const displayAppList = (e) => {
    const appList = appliancesArray.map(a => new AppliancesList(a))

    const renderAllAppliance = (appliancesArray) => {
        let all = ''
        for (let appliance of appliancesArray) {
            all += appliance.buildApplianceList()
        }
        return all
    }
    listOfAppliances.innerHTML = renderAllAppliance(appList)
    listOfAppliances.classList.add('displayDrop')
    listOfAppliances.style.display = ''
    listOfAppliances.setAttribute('aria-hidden', 'false')
    listOfIngredients.style.display = 'none'
    listOfUstensils.style.display = 'none'
}
window.addEventListener('load', displayAppList)

const displayUstList = (e) => {
    const ustList = ustensilsArray.map(u => new UstensilsList(u))
    // console.log(ustList)

    const renderAllUstensils = (ustensilsArray) => {
        let all = ''
        for (let ustensil of ustensilsArray) {
            all += ustensil.buildUstensilList()
            // console.log(all)
        }
        return all
    }
    listOfUstensils.innerHTML = renderAllUstensils(ustList)
    listOfUstensils.classList.add('displayDrop')
    listOfUstensils.style.display = ''
    listOfUstensils.setAttribute('aria-hidden', 'false')
    listOfIngredients.style.display = 'none'
    listOfAppliances.style.display = 'none'
}
window.addEventListener('load', displayUstList)


const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    tags.classList.add('.tagselected')
    tags.style.display=''
    
    // let currentTag = e.target.document.querySelectorAll('.list-items')
    // console.log(currentTag)

    // tagContainer = new Tags(tag,ingredient)

    // tags.innerHTML = renderTags(tagContainer)
}

const startTagsListener = () =>{
    selectedTags.document.querySelectorAll('.list-items li')//on recupere tous nos li
    for (let t of selectedTags){
        t.addEventListener('click', displayTags)
    }
}
window.addEventListener('load',displayTags)

//on injecte le html du render recipe ds notre section recette
const displayRecipes = () => {

    const container = recipes.map(r => new RecipeCard(r))
    // console.log(container)
    const renderAllRecipes = (recipes) => {
        let all = ''
        // console.log(all)
        for (let recipe of recipes) {
            all += recipe.renderRecipe()
            // console.log(all)
        }
        return all

    }
    recipesContainer.innerHTML = renderAllRecipes(container)
}

window.addEventListener('load', displayRecipes)

