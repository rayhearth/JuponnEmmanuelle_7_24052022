import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []
// console.log(recipes)

/*traitement app*/

const principalSearch = document.querySelector('#search')
let searchValue = ''

const ingSearch = document.querySelector('#ingredients')
let ingValue = ''

//const ou est stocke la div no result
const ghost = document.querySelector('#noResults')

let Search = () => {

  searchValue = principalSearch.value.trim().toLowerCase()

  const searchArray = []

recipes.filter((recipe) =>{
  if(recipe.name.includes(searchValue) || recipe.description.includes(searchValue) || recipe.ingredients.find((elt)=>
    elt.ingredient.includes(searchValue))){
      searchArray.push(recipe)
      console.log(searchArray)
    }
})

}


principalSearch.addEventListener('input', Search)


