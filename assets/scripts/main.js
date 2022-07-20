import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'


//DOM

//recipes cards
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')
//const ou est stocke la div no result
const ghost = document.querySelector('#noResults')

const tagsList = document.querySelector('#tagsList')

//inputs
const principalSearch = document.querySelector('#search')

const filterExp = document.querySelectorAll('.controlExpand')

const ingredientFilter = document.querySelector('#ingredients-filter')
const applianceFilter = document.querySelector('#appliance-filter')
const ustensilFilter = document.querySelector('#ustensils-filter')

//ul
const listOfIngredients = document.querySelector('#ingredientsList')
const listOfUstensils = document.querySelector('#ustensilsList')
const listOfAppliances = document.querySelector('#applianceList')


//search 
const ingSearch = document.querySelector('#ingredients')
const appSearch = document.querySelector('#appareils')
const ustSearch = document.querySelector('#ustensiles')

const ingLabel = document.querySelector('#ingL')
const appLabel = document.querySelector('#appL')
const ustLabel = document.querySelector('#ustL')



//CREATION DES ARRAY
recipes: [] // toutes les recettes
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

let searchValue = ''//requête de principe principal search
let searchArray = []// array recipes founnd prinipal search


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



//RECHERCHE PRINCIPALE
let Search = () => {

    searchValue = principalSearch.value.trim().toLowerCase()

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

            /*MAJ des listes en fonction du résultat de la recherche principale*/
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

// Listener principal search
principalSearch.addEventListener('input', Search)





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

const init = () =>{
    displayRecipes()
    Search()

}

init()

