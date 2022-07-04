import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'
// import { Search }  from './algo1.js'


//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')
const tagsList = document.querySelector('#tagsList')

//inputs
const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')

//search listes
const ingLabel = document.querySelector('#ingL')
const ingSearch = document.querySelector('#ingredients')
const appLabel = document.querySelector('#appL')
const appSearch = document.querySelector('#appareils')
const ustLabel = document.querySelector('#ustL')
const ustSearch = document.querySelector('#ustensiles')

const principalSearch = document.querySelector('#search')

//ul
const listOfIngredients = document.querySelector('#ingredientsList')
const listOfUstensils = document.querySelector('#ustensilsList')
const listOfAppliances = document.querySelector('#applianceList')


//Création des Array
recipes: [] //array de toutes les recettes
/*traitement ing*/
let ing = recipes.map(i => i.ingredients.map(n => n.ingredient.toLowerCase()))
ing = ing + ''
//transforme string en array  
let ingData = ing.split(',')
let ingredientsArray = [...new Set(ingData)].sort() // array de tous les ingredients filtrés

/*traitement app*/
let app = recipes.map(a => a.appliance.toLowerCase())
let appliancesArray = [...new Set(app)].sort() //array de tous les appareils

/*traitement des ustensils*/
let ust = recipes.map(u => u.ustensils.toString().toLowerCase())
ust = ust + ''
let ustData = ust.split(',')
let ustensilsArray = [...new Set(ustData)].sort() // array de tous les ustenciles


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



/*Affichage Liste Ing*/
const buildIngredientsList = (ingredient) => {
    return `<li class="list-items ingredient" data-type="ingredient">
    ${ingredient}</li>`
}

const displayIngList = (e) => {
    const ingList = ingredientsArray

    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        for (let ingredient of ingredientsArray) {
            all += buildIngredientsList(ingredient)
        }
        return all
    }
    ingLabel.classList.add('hidden')
    ingSearch.classList.remove('hidden')
    listOfIngredients.innerHTML = renderAllIngredient(ingList)
    listOfIngredients.style.display = ''
    listOfIngredients.setAttribute('aria-hidden', 'false')

    listOfAppliances.style.display = 'none'
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')

    listOfUstensils.style.display = 'none'
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayIngList)

/* Affichage Liste App*/
const buildApplianceList = (appliance) => {
    return `<li class="list-items appliance" data-type="appliance">
        ${appliance}</li>`
}

const displayAppList = (e) => {
    const appList = appliancesArray

    const renderAllAppliance = (appliancesArray) => {
        let all = ''
        for (let appliance of appliancesArray) {
            all += buildApplianceList(appliance)
        }
        return all
    }
    appLabel.classList.add('hidden')
    appSearch.classList.remove('hidden')
    listOfAppliances.innerHTML = renderAllAppliance(appList)
    listOfAppliances.style.display = ''
    listOfAppliances.setAttribute('aria-hidden', 'false')


    listOfIngredients.style.display = 'none'
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')

    listOfUstensils.style.display = 'none'
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayAppList)


/*Affichage Liste Ust*/
const buildUstensilList = (ustensil) => {
    return `<li class="list-items ustensil" data-type="ustensil">
    ${ustensil}</li>`
}

const displayUstList = (e) => {
    const ustList = ustensilsArray

    const renderAllUstensils = (ustensilsArray) => {
        let all = ''
        for (let ustensil of ustensilsArray) {
            all += buildUstensilList(ustensil)
        }
        return all
    }
    ustLabel.classList.add('hidden')
    ustSearch.classList.remove('hidden')
    listOfUstensils.innerHTML = renderAllUstensils(ustList)
    listOfUstensils.style.display = ''
    listOfUstensils.setAttribute('aria-hidden', 'false')
    listOfIngredients.style.display = 'none'
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')

    listOfAppliances.style.display = 'none'
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')

    startTagsListener()
}
window.addEventListener('load', displayUstList)



let selectedTags = []

let selectIngredients = []
// console.log(selectIngredients)
let selectedAppliances = []
// console.log(selectedAppliances)
let selectedUstensils = []
// console.log(selectedUstensils)
let selectedRecipes = []


const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    tags.classList.add('tagselected')
    tags.classList.remove('hidden')
    tagsList.style.display = ''

    let currentTag = e.target
    console.log((currentTag))

    
    // if (currentTag.classList.contains('.ingredient')){
    //     selectIngredients.push(currentTag.innerHTML)
    //     // listOfIngredients.delete(currentTag.innerHTML)
    // } else if (currentTag.classList.contains('appliance')){
    //     selectedAppliances.push(currentTag.innerHTML)

    // } else if (currentTag.classList.contains('ustensil')) {
    //     selectedUstensils.push(currentTag.innerHTML)
    // } else{
    //     const tagsArray = selectIngredients.concat(selectedAppliances).concat(selectedUstensils)
    //     console.log(tagsArray)
    // }
    // switch (currentTag.classList.contains('ingredient')){
    //     case 'ingredient':
    //         selectedIngredients.push(currentTag.innerHTML)
    // }

    tagsList.innerHTML = renderTags(currentTag.innerHTML)
}
const renderTags = (currentTag) => {
    return `
    <li class="tagSelect">
        <h3>${currentTag}</h3>
        <button class="tagBtn">
            <img src="./assets/img/clTag.svg" alt="">
        </button>
    </li>`
}

const startTagsListener = () => {
    selectedTags = document.querySelectorAll('.list-items')//on recupere tous nos li
    for (let t of selectedTags) {
        t.addEventListener('click', displayTags)
    }
}
window.addEventListener('load', displayTags)

//on injecte le html du render recipe ds notre section recette
const displayRecipes = () => {

    const container = recipes.map(r => new RecipeCard(r))
    const renderAllRecipes = (recipes) => {
        let all = ''
        for (let recipe of recipes) {
            all += recipe.renderRecipe()
        }
        return all

    }
    recipesContainer.innerHTML = renderAllRecipes(container)
}

window.addEventListener('load', displayRecipes)

