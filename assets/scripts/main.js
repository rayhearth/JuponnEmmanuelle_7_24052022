import recipes from './recipes.js'
import { RecipeCard  } from './models/recipeCard.js'

//DOM
const recipesContainer = document.querySelector('#recettes')
const tags = document.querySelector('#tagsSelect')

//inputs
const ingredientFilter = document.querySelector("#ingredients-filter")
const applianceFilter = document.querySelector("#appliance-filter")
const ustensilFilter = document.querySelector("#ustensils-filter")
const principalSearch = document.querySelector("#search")

//ul
const listOfIngredients = document.querySelector("#ingredientsList");
const listOfUstensils = document.querySelector("#ustensilsList");
const listOfAppliances = document.querySelector("#applianceList");

// insertion effective des tags dans les modules, selon leur type
let ingredient = 'ingredient'
let appareil = 'appareil'
let ustensile = 'ustensile'
let saisieUtilisateur = ''

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


// création de la liste de recettes


// const displayRecipes = () =>{

//     const container = recipes.map(r => new Recette(r))
//     console.log(container)
//     document.querySelector('#recettes').innerHTML = renderAllRecipes(container)
// }


// const renderAllRecipes = (recipes) => {
//     let all = ''
//     for (let recipe of recipes){
//         all += recipe.renderRecipe()
//     }
//     return all
// }




