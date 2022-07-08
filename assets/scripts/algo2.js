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

  const SearchArray = []

  //flag peut être =-1 ou undefined--va permettre d'itérer sur un un array pour le spread l42
  let flag = -1
  //array vide d'ingredients
  let ing = []
  let app = []
  let ust = []

  recipes.forEach((element, index) => {
    //si flag diff de index
    if (flag != index) {
      //alors on stocke index de l'ing ds un array
      ing[index] = []
      app[index] = []
      ust[index] = []
      flag = index
    }
    //pour chaque item on obtient un array avec l'index de la recipe et les items de cette recipe
    ing[index] = [...ing[index], ...element.ingredients.map(i => i.ingredient)]
    app[index] = [...app[index], element.appliance]
    ust[index] = [...ust[index], element.ustensils.toString()]

    //on concat les trois tableaux et on enleve les doublons
    let itemArray = [...new Set(ing[index].concat(app[index]).concat(ust[index]).concat(element.name).concat(element.description))]
    console.log(itemArray)
    let result = itemArray.findIndex
  
  })


  const research = () => {
    if (searchValue >= 3) {
      let searchArray = recipes.reduce(function (accumulator, searchValue) {
        if (accumulator.find(searchValue)) {
          accumulator.push(searchArray)
          // console.log(searchArray)
        }
        return accumulator
      }, [])


    }

  }


}


principalSearch.addEventListener('input', Search)