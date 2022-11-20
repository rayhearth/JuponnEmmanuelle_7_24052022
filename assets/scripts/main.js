import recipes from './recipes.js'
import { RecipeCard } from './models/recipeCard.js'


//DOM
const tagsList = document.querySelector('#tagsList')//div des tags
const recipesContainer = document.querySelector('#recettes')//section des recettes

//btn ouverture et fermetures des listes
const filterBtn = document.querySelectorAll('.filterBtn')
const expandBtn = document.querySelectorAll('.controlExpand')

//search listes
const ingLabel = document.querySelector('#ingL')
const appLabel = document.querySelector('#appL')
const ustLabel = document.querySelector('#ustL')

//input
const principalSearch = document.querySelector('#search')
let searchValue = ''// requête principe de recherche de recettes

const ingSearch = document.querySelector('#ingredients')
const appSearch = document.querySelector('#appareils')
const ustSearch = document.querySelector('#ustensiles')


//listes des ingredients; appliances, ustensils
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



//Recuperation des données des listes
const allList = () => {
    recipes.forEach(recipe => {
        recipe.ingredients.map(el => {
            ingredientsArray.push(el.ingredient.toLowerCase().replaceAll(/[.,!?]/g, ""))
        })
        appliancesArray.push(recipe.appliance.toLowerCase().replaceAll(/[.,!?]/g, ""))
        recipe.ustensils.map(el => {
            ustensilsArray.push(el.toLowerCase().replaceAll(/[.,!?]/g, ""))
        })
    })
    // je trie pour supp les doublons
    ingredientsArray = [...new Set(ingredientsArray)].sort()
    appliancesArray = [...new Set(appliancesArray)].sort()
    ustensilsArray = [...new Set(ustensilsArray)].sort()
}

window.addEventListener('load', allList)


// listeners Filters display and close method
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

// listeners Filters close method
expandBtn.forEach(btn => {

    btn.addEventListener('click', e => {
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


//METHODE DE TRAITEMENT DES LI 

/*Render Liste Ing*/
const buildIngredientsList = (ingredient) => {
    return `<li class="list-items ingredient" data-type="ingredient">${ingredient.charAt(0).toUpperCase() + ingredient.substr(1).toLowerCase()}</li>`
}

/*Affichage des li */
const displayIngList = () => {
    //pour chaque ingredients de notre array on passe la methode buildIngredientsList
    const renderAllIngredient = (ingredientsArray) => {
        let all = ''
        for (let ingredient of ingredientsArray) {
            all += buildIngredientsList(ingredient)
        }
        return all
    }
    // on cache le label ingredient pour faire apparaitre la recherche secondaire
    ingLabel.classList.add('hidden')
    ingSearch.classList.remove('hidden')
    listOfIngredients.style.display = ''
    listOfIngredients.setAttribute('aria-hidden', 'false')
    document.querySelector('.expIng').style.transform = 'rotate(180deg)'
    //on injecte notre html
    listOfIngredients.innerHTML = renderAllIngredient(ingredientsArray)
    //on branche le listener des tags
    startTagsListener()

}
window.addEventListener('load', displayIngList)

//fermeture des li
const closeIngList = () => {
    ingLabel.classList.remove('hidden')
    ingSearch.classList.add('hidden')
    listOfIngredients.style.display = 'none'
    listOfIngredients.setAttribute('aria-hidden', 'true')
    document.querySelector('.expIng').style.transform = 'none'
}
window.addEventListener('load', closeIngList)


/* Affichage Liste App*/
const buildApplianceList = (appliance) => {
    return `<li class="list-items appliance" data-type="appliance">${appliance.charAt(0).toUpperCase() + appliance.substr(1).toLowerCase()}</li>`
}

const displayAppList = () => {

    const renderAllAppliance = (appliancesArray) => {
        let all = ''
        for (let appliance of appliancesArray) {
            all += buildApplianceList(appliance)
        }
        return all
    }
    appLabel.classList.add('hidden')
    appSearch.classList.remove('hidden')
    listOfAppliances.innerHTML = renderAllAppliance(appliancesArray)
    listOfAppliances.style.display = ''
    listOfAppliances.setAttribute('aria-hidden', 'false')
    document.querySelector('.expApp').style.transform = 'rotate(180deg)'

    startTagsListener()
}
window.addEventListener('load', displayAppList)

const closeAppList = () => {
    appLabel.classList.remove('hidden')
    appSearch.classList.add('hidden')
    listOfAppliances.style.display = 'none'
    listOfAppliances.setAttribute('aria-hidden', 'true')
    document.querySelector('.expApp').style.transform = 'none'
}
window.addEventListener('load', closeAppList)

/*Affichage Liste Ust*/
const buildUstensilList = (ustensil) => {
    return `<li class="list-items ustensil" data-type="ustensil">${ustensil.charAt(0).toUpperCase() + ustensil.substr(1).toLowerCase()}</li>`
}

const displayUstList = () => {

    const renderAllUstensils = (ustensilsArray) => {
        let all = ''
        for (let ustensil of ustensilsArray) {
            all += buildUstensilList(ustensil)
        }
        return all
    }

    ustLabel.classList.add('hidden')
    ustSearch.classList.remove('hidden')
    listOfUstensils.innerHTML = renderAllUstensils(ustensilsArray)
    listOfUstensils.style.display = ''
    listOfUstensils.setAttribute('aria-hidden', 'false')
    document.querySelector('.expUst').style.transform = 'rotate(180deg)'

    startTagsListener()
}
window.addEventListener('load', displayUstList)

const closeUstList = () => {
    ustLabel.classList.remove('hidden')
    ustSearch.classList.add('hidden')
    listOfUstensils.style.display = 'none'
    listOfUstensils.setAttribute('aria-hidden', 'true')
    document.querySelector('.expUst').style.transform = 'none'
}
window.addEventListener('load', closeUstList)

/*TAITEMENT DES TAGS */

let selectedTags = []

let selectedIngredients = []//array ingredients tags
let selectedAppliances = []//array appliances tags
let selectedUstensils = []//array ustensils tags

const renderTags = (tag) => {

    return `
    <li class="tagSelect" dataset='${tag.dataset}' >
    <h3>${tag.innerHTML}</h3>
    <button class="tagBtn">
    <img src="./assets/img/clTag.svg" alt="">
    </button>
    </li>`
}

const displayTags = (e) => {
    //cible endroit où tags select seront insérés
    document.querySelector('#tagsSelect').classList.remove('hidden')
    document.querySelector('#tagsSelect').style.display = ''
    //cible element clické
    let currentTag = e.target
    // en fonction du type on insère ds le tableau selectIng, selectApp, selectUst
    switch (currentTag.dataset.type) {
        case 'ingredient':
            selectedIngredients.push({
                innerHTML: currentTag.textContent,
                dataset: 'ingredient'
            })
            break;
        case 'appliance':
            selectedAppliances.push({
                innerHTML: currentTag.textContent,
                dataset: 'appliance'
            })
            break;
        case 'ustensil':
            selectedUstensils.push({
                innerHTML: currentTag.textContent,
                dataset: 'ustensil'
            })
            break;
    }

    //on concat les résultats ds le tableau de selectags et on enlève les doublons
    selectedTags = [...new Set([...selectedIngredients, ...selectedAppliances, ...selectedUstensils])].sort()

    Search(e.target.textContent.toLowerCase())


    //on parcours le tableau de tags et on appelle la methode de render pour chacun d'eux
    const renderAllTags = (selectedTags) => {
        let all = ''
        for (let tag of selectedTags) {
            all += renderTags(tag)
        }
        return all
    }
    // on insère la méthode avec le tag ds le html
    tagsList.innerHTML = renderAllTags(selectedTags)

    let tagClose = document.querySelectorAll('.tagBtn')

    tagClose.forEach((tag) => tag.addEventListener('click', closeTags))
}


const startTagsListener = () => {
    selectedTags = Array.from(document.querySelectorAll('.list-items'))//on recupere tous nos li et on les stockent ds un array
    //pour chaque tag on ajoute un listener pour le display de celui-ci
    for (let t of selectedTags) {
        t.addEventListener('click', displayTags)
    }

}

const closeTags = (e) => {
    // on cible le li ou se situe le btn close
    let elem = e.target.closest("li")

    selectedTags = selectedTags.filter(item => {
        return item.textContent.toLowerCase() != elem.textContent.toLowerCase().trim()
    })

    selectedIngredients = selectedIngredients.filter(item => {
        return item.innerHTML.toLowerCase().trim() != elem.textContent.toLowerCase().trim()
    })
    selectedAppliances = selectedAppliances.filter(item => {
        return item.textContent.toLowerCase().trim() != elem.textContent.toLowerCase().trim()
    })
    selectedUstensils = selectedUstensils.filter(item => {
        return item.textContent.toLowerCase().trim() != elem.textContent.toLowerCase().trim()
    })
    elem.remove()
    // elem.style.display = 'none'
}

/*RECHERCHE PRINCIPALE */
let Search = (recup) => {
    //on cible notre input de recherche 
    searchValue = recup
    // on cree une const qui va stocker les résultats de notre recherche
    const searchArray = []

    // mise à jour des li en fonction de la recherche pricipale
    const allListFiltered = () => {
        searchArray.forEach(item => {
            item.ingredients.map(el => {
                ingSelectedArray.push(el.ingredient.toLowerCase())
            })
            appSelectedArray.push(item.appliance.toLowerCase())
            item.ustensils.map(el => {
                ustSelectedArray.push(el.toLowerCase())
            })
        })

        //on met a jour notre variable en fonction du nouveau tableau
        ingredientsArray = [...new Set(ingSelectedArray.filter(e => e != recup))].sort()
        appliancesArray = [...new Set(appSelectedArray.filter(e => e != recup))].sort()
        ustensilsArray = [...new Set(ustSelectedArray.filter(e => e != recup))].sort()
    }
    //pour chaque recette de recipes on verifie si les mots entrés ds search value correspondent, si oui on stocke la recette ds notre variable searchArray
    recipes.filter((recipe) => {
        if (recipe.name.trim().toLowerCase().includes(searchValue) || recipe.description.trim().toLowerCase().includes(searchValue) || recipe.ingredients.find((el) =>
            el.ingredient.trim().toLowerCase().includes(searchValue))) {
            searchArray.push(recipe)
        }
    })


    if (searchValue.length >= 3) {

        //on appelle la méthode qui va mettre à jour les listes d'ingrédients, d'appareils et d'ustensils en fonction de la recherche
        allListFiltered()

        /* Création des recipes cards en fonction du resultat de la recherche*/
        //on parcour l'array obtenu et on instancie la class recipeCard
        const results = searchArray.map(s => new RecipeCard(s))

        //on cree une méthode qui va gérer le html de toutes les recettes trouvées
        const visualAll = (searchArray) => {
            let all = ''
            for (let searching of searchArray) {
                all += searching.renderRecipe()
            }
            return all
        }
        document.querySelector('#recettes').innerHTML = visualAll(results)

        //si le tableau de recettes est vide on affiche le message no results
        if (searchArray.length == 0) {
            recipesContainer.innerHTML = `
            <p> Aucune recette ne correspond à vos critères de recherche.<br>Vous pouvez chercher « tarte aux pommes
                »,« poisson », etc.</p>
            `
        }
    }
}

principalSearch.addEventListener('input', () => {
    Search(principalSearch.value.trim().toLowerCase())
})

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

