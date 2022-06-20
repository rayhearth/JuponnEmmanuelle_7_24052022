import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'
import { IngredientsList, AppliancesList, UstensilsList } from './models/createLists.js'
import { Tags } from './models/tags.js'


//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')

//inputs
const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')
const btnfilter = document.querySelectorAll('.controlExpand')

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
// console.log(recipes)
//traitement ing
let ing = recipes.map(i => i.ingredients.map(n => n.ingredient))
ing = ing +''
//transforme string en array  
let ingData = ing.split(',')
//uniformise caract
const lowIngData = ingData.map(el=> {
    return el.toLowerCase()})
let ingredientsArray = [...new Set(lowIngData)] // array de tous les ingredients filtrés
// console.log(ingredientsArray)

let addItem = (ingredientsArray, parentElm) => {
    console.log('ygfyf')
	ingredientsArray.forEach(item => {
		let option = create("li", {class: "list-item"});
		option.textContent = item.charAt(0).toUpperCase() + item.slice(1);
		parentElm.appendChild(option);
	})
}



//traitement app
let app = recipes.map(a => a.appliance)
let appliancesArray = [...new Set(app)] //array de tous les appareils
// console.log(appliancesArray)

// traitement des ustensils
let ust = recipes.map(u => u.ustensils)
ust = ust +','
let ustData = ust.split(',')
const lowUstData = ustData.map(el=>{
    return el.toLowerCase()
})
let ustensilsArray = [...new Set (lowUstData)] // array de tous les ustenciles
// console.log(ustensilsArray)



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

const buildIngredientsList = (ingredient) => {

    return `<li class="list-items" data-item="${ingredient}" data-type="ingredient">
    ${ingredient}
    </li>
    `

}

const displayIngList = (e) => {
    const ingList = ingredientsArray.map(i => buildIngredientsList(i))
    console.log(ingList)

    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        for (let ingredient of ingredientsArray) {
            all += buildIngredientsList(ingredient)
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

    const renderAllUstensils = (ustensilsArray) => {
        let all = ''
        for (let ustensil of ustensilsArray) {
            all += ustensil.buildUstensilList()
        }
        return all
    }
    listOfUstensils.innerHTML = renderAllUstensils(ustList)
    listOfUstensils.classList.add('displayDrop')
    listOfUstensils.style.display = ''
    listOfUstensils.setAttribute('aria-hidden', 'false')
    listOfIngredients.style.display = 'none'
    listOfAppliances.style.display = 'none'
    startTagsListener()
}
window.addEventListener('load', displayUstList)


const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    tags.classList.add('.tagselected')
    tags.style.display=''
    
    let currentTag = e.target
    // console.log(currentTag)

    // tagContainer = new Tags(tag,ingredient)

    // tags.innerHTML = renderTags(tagContainer)
}

const startTagsListener = () =>{
    selectedTags = document.querySelectorAll('.list-items')//on recupere tous nos li
    // console.log(selectedTags)
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

