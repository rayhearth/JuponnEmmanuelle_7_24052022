import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'


//DOM
const recipesContainer = document.querySelector('#recettes')
//const ou est stocke la div no result
const ghost = document.querySelector('#noResults')
const tags = document.querySelector('#tagsSelect')
const tagsList = document.querySelector('#tagsList')

//inputs
const filterBtn = document.querySelectorAll('.filterBtn')
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
let ingredientsArray = [] //array des ing
let appliancesArray = []// array app
let ustensilsArray = []//array ust


let searchValue = ''

//Recuperation des données des listes
const allList = () => {
    recipes.forEach(recipe => {
        recipe.ingredients.map(el => {
            ingredientsArray.push(el.ingredient.toLowerCase())
        })
        appliancesArray.push(recipe.appliance.toLowerCase())
        recipe.ustensils.map(el => {
            ustensilsArray.push(el.toLowerCase())
        })
    })
    // je trie pour supp les doublons
    ingredientsArray = [...new Set(ingredientsArray)].sort()
    appliancesArray = [...new Set(appliancesArray)].sort()
    ustensilsArray = [...new Set(ustensilsArray)].sort()
}

window.addEventListener('load', allList)


// listeners Filters
filterBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        switch (btn.dataset.filter) {
            case 'ingrédients':
                displayIngList()
                closeAppList()
                closeUstList()
                break;
            case 'appareils':
                displayAppList()
                closeIngList()
                closeUstList()
                break;
            case 'ustensiles':
                displayUstList()
                closeIngList()
                closeAppList()
                break;
        }
    })
})


/*Render Liste Ing*/
const buildIngredientsList = (ingredient) => {
    return `<li class="list-items ingredient" data-type="ingredient">
    ${ingredient}</li>`
}

/*Affichage des li */
const displayIngList = () => {
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


    startTagsListener()

}
window.addEventListener('load', displayIngList)

//fermeture des li
const closeIngList = () => {
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')
    listOfIngredients.style.display = 'none'
    listOfIngredients.setAttribute('aria-hidden', 'true')
}
window.addEventListener('load', closeIngList)


/* Affichage Liste App*/
const buildApplianceList = (appliance) => {
    return `<li class="list-items appliance" data-type="appliance">
        ${appliance}</li>`
}

const displayAppList = () => {
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



    startTagsListener()
}
window.addEventListener('load', displayAppList)

const closeAppList = () => {
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')
    listOfAppliances.style.display = 'none'
    listOfAppliances.setAttribute('aria-hidden', 'true')
}
window.addEventListener('load', closeAppList)

/*Affichage Liste Ust*/
const buildUstensilList = (ustensil) => {
    return `<li class="list-items ustensil" data-type="ustensil">
    ${ustensil}</li>`
}

const displayUstList = () => {
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


    startTagsListener()
}
window.addEventListener('load', displayUstList)

const closeUstList = () => {
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')
    listOfUstensils.style.display = 'none'
    listOfUstensils.setAttribute('aria-hidden', 'true')
}
window.addEventListener('load', closeUstList)



let selectedTags = []

let selectIngredients = []
// console.log(selectIngredients)
let selectedAppliances = []
// console.log(selectedAppliances)
let selectedUstensils = []
// console.log(selectedUstensils)

const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    tags.classList.remove('hidden')
    tagsList.style.display = ''

    let currentTag = e.target
    switch (currentTag.dataset.type) {
        case 'ingredient':
            selectIngredients.push(currentTag)
            break;
        case 'appliance':
            selectedAppliances.push(currentTag)
            break;
        case 'ustensil':
            selectedUstensils.push(currentTag)
            break;
    }



    tagsList.innerHTML = currentTag.innerHTML + `<button class="tagBtn">
    <img src="./assets/img/clTag.svg" alt=""></button>`
}
// const renderTags = (currentTag) => {
//     return `
//     <li class="tagSelect">
//         <h3>${currentTag}</h3>
//         <button class="tagBtn">
//             <img src="./assets/img/clTag.svg" alt="">
//         </button>
//     </li>`
// }

const startTagsListener = () => {
    selectedTags = document.querySelectorAll('.list-items')//on recupere tous nos li
    for (let t of selectedTags) {
        t.addEventListener('click', displayTags)
    }
}
window.addEventListener('load', displayTags)


let Search = () => {

    searchValue = principalSearch.value.trim().toLowerCase()
    const searchArray = []


    recipes.filter((recipe) => {
        if (recipe.name.trim().toLowerCase().includes(searchValue) || recipe.description.trim().toLowerCase().includes(searchValue) || recipe.ingredients.find((el) =>
            el.ingredient.trim().toLowerCase().includes(searchValue))) {
            searchArray.push(recipe)
        }
    })


    if (searchValue.length >= 3) {

        /* Création des recipes cards en fonction du resultat de la recherche*/
        //on parcour l'array obtenu et on instancie la class recipeCard
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

        if (searchArray.length == 0) {
            ghost.classList.remove('hidden')
        } else {
            ghost.classList.add('hidden')
        }
    }
}

principalSearch.addEventListener('input', Search)

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

