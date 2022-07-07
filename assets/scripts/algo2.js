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

  const SearchArray = ['name', 'description']


  /***********************
  TEST
   ****************/
  //flag peut être =-1 ou undefined--va permettre d'itérer sur un un array pour le spread l42
  let flag = -1
  //array vide d'ingredients
  let ing = []
  let app=[]
  let ust = []
  
  recipes.forEach((element, index) => {
    //si flag diff de index
    if (flag != index) {
      //alors on stocke index de l'ing ds un array
      ing[index] = []
      app[index] = []
      ust [index] = []
      flag = index
    }
    //on stocke ds ing[index]: un array avec l'index des ing et notre array pour chaque recipe 
    ing[index] = [...ing[index], ...element.ingredients.map(i => i.ingredient)]
    app[index] = [...app[index], element.appliance]
    ust[index] = [...ust[index], element.ustensils.map(u=>u.ustensils)]
  })
  // console.log(ing)
  console.log(app)
  console.log(ust)

  const research = () => {
    if (searchValue >= 3) {
      let searchArray = recipes.reduce(function (accumulator, currentValue) {
        if (accumulator.find(currentValue)) {
          accumulator.push(currentValue)
        }
        return accumulator
      }, [])


      console.log(searchArray)
    }

  }


}


principalSearch.addEventListener('input', Search)