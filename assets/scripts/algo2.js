import { RecipeCard } from './models/recipeCard.js'
import recipes from './recipes.js'

recipes: []
console.log(recipes)

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

  // const keywords = Object.keys(recipes)
  // console.log(keywords)
  // const result = keywords.reduce((next,key)=>{
  //   if(SearchArray.includes(key)){
  //     return {...next, [key]:recipes[key]}
  //   } else {
  //     return next
  //   }
  // },{})


  // const research = recipes.reduce((acc, curr) =>{
  //   if(curr.name.toLowerCase().includes(searchValue)||curr.description.includes(searchValue)){
  //     acc.push(curr)
  //   }
  // })

  recipes.findIndex(x=>x.ingredients)

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
  // recipes.name.toLowerCase().find(results === searchValue) || recipes.descrption.find(results === searchValue)
console.log(recipes)
}
// return recipe

  // recipes.reduce(research, {})

  // const research = (searchValue , recipe) =>{
  //   if (recipes.name.toLowerCase().includes(searchValue) || recipes.description.includes(searchValue)){
  //     return recipe
  //   }else{
  //     if (recipes.ingredients.ingredient.toLowerCase().includes(searchValue)){
  //       return recipe
  //     }
  //   }
  // }

  // recipes.reduce(research,{})
// }

principalSearch.addEventListener('input', Search)