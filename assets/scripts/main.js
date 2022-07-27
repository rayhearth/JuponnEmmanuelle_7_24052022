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
const expandBtn = document.querySelectorAll('.controlExpand')


//search listes
const ingLabel = document.querySelector('#ingL')
const appLabel = document.querySelector('#appL')
const ustLabel = document.querySelector('#ustL')

//input
const ingSearch = document.querySelector('#ingredients')
const appSearch = document.querySelector('#appareils')
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
let ingSelectedArray = []// array des ingredients selectionnés
let appSelectedArray = []// array des ingredients appliance
let ustSelectedArray = []// array des ingredients ustensils

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

expandBtn.forEach(btn => {
    
    btn.addEventListener('click', e => {
        console.log('hgfgh')
        switch (btn.dataset.expand) {
            case 'ingredient':
                closeIngList()
                break;
            case 'appareils':
                closeAppList()
                break;
            case 'ustensiles':
                closeUstList()
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

    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        console.log('ghzydr')
        for (let ingredient of ingredientsArray) {
            all += buildIngredientsList(ingredient)
        }
        return all
    }

    ingLabel.classList.add('hidden')
    ingSearch.classList.remove('hidden')
    listOfIngredients.innerHTML = renderAllIngredient(ingredientsArray)
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

/*TAITEMENT DES TAGS */

let selectedTags = []

let selectIngredients = []//array ingredients tags
let selectedAppliances = []//array appliances tags
let selectedUstensils = []//array ustensils tags


const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    document.querySelector('#tagsSelect').classList.remove('hidden')
    document.querySelector('#tagsSelect').style.display = ''
    console.log('albert')
    let currentTag = e.target
    // console.log(currentTag)
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

    selectedTags = selectIngredients.concat(selectedAppliances, selectedUstensils)

    const renderAllTags = (selectedTags) => {
        let all = ''
        for (let tag of selectedTags) {
            all += renderTags(tag)
        }
        return all
    }

    tagsList.innerHTML = renderAllTags(selectedTags)

    let tagClose = document.querySelectorAll('.tagBtn')
    tagClose.forEach((tag) => tag.addEventListener('click', closeTags))
}

const closeTags = (e) => {

    let elem = e.target.closest('li')
    elem.style.display = 'none'
}

const renderTags = (tag) => {
    console.log(tag)
    return `
    <li class="tagSelect" data-type=${tag.dataset.type}>
        <h3>${tag.innerHTML}</h3>
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



let Search = () => {

    searchValue = principalSearch.value.trim().toLowerCase() || ingSearch.value.trim().toLowerCase() || appSearch.value.trim().toLowerCase() || ustSearch.value.trim().toLowerCase()
    const searchArray = []

    const allListFiltered = () => {
        searchArray.forEach(item => {
            item.ingredients.map(el => {
                ingSelectedArray.push(el.ingredient)
                // console.log(ingSelectedArray)
            })
            appSelectedArray.push(item.appliance)
            item.ustensils.map(el => {
                ustSelectedArray.push(el)
            })
        })

        ingredientsArray = [...new Set(ingSelectedArray)].sort()
        // console.log(ingSelectedArray)
        appliancesArray = [...new Set(appSelectedArray)].sort()
        // console.log(appSelectedArray)
        ustensilsArray = [...new Set(ustSelectedArray)].sort()
    }

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
        // console.log(results)
        allListFiltered()

        // const displayIngList = () => {
        //     console.log('gfqg')
        //     const renderAllIngredient = (ingSelectedArray) => {
        //         let all = ''
        //         for (let ingredient of ingSelectedArray) {
        //             all += buildIngredientsList(ingredient)
        //         }
        //         return all
        //     }

        //     listOfIngredients.innerHTML = renderAllIngredient(ingSelectedArray)
        //     console.log(listOfIngredients)
        // }
        // window.addEventListener('load', displayIngList)
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

let SearchIng = () => {
    searchValue = ingSearch.value.trim().toLowerCase()
    const ingSelected = []
    console.log(ingSelected)
    recipes.filter((recipe) => {
        if (recipe.ingredients.find((el) =>
            el.ingredient.trim().toLowerCase().includes(searchValue))) {
            ingSelected.push(recipe)
        }
    })

    if (searchValue.length >= 3) {

        /* Création des recipes cards en fonction du resultat de la recherche*/
        //on parcour l'array obtenu et on instancie la class recipeCard
        const r = ingSelect.map(s => new RecipeCard(s))
        console.log(r)
        allListFiltered()

        //on cree une méthode qui va gérer le html de toutes les ecttes trouvées
        const visualAll = (ingSelect) => {
            let all = ''
            for (let searching of ingSelect) {
                all += searching.renderRecipe()
            }
            return all
        }
        document.querySelector('#recettes').innerHTML = visualAll(results)

        if (ingSelect.length == 0) {
            ghost.classList.remove('hidden')
        } else {
            ghost.classList.add('hidden')
        }
    }
}

ingSearch.addEventListener('input', SearchIng)

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

