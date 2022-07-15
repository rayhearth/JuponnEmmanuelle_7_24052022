import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []

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


