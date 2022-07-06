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
  // console.table(recipes)
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
  
  /***********************
   TEST
   ****************/
// const indexIngArray = (recipes, ingredients)=>{
// let index = [].concat.apply([], ([].concat.apply([], recipes))).indexOf(ingredients)
// // console.log(index)
// if(index === -1){
//   return false
// }
// let numColumns = recipes[0].length

// let row=parseInt(index/numColumns)

// let col = index % numColumns

// return [row,col]
//   }
// const researchIng = recipes.reduce((acc, curr)=>{
//   return indexIngArray()
// })

const iList = recipes.map((recipe) => recipe.ingredients.indexOf(ingredients))
console.log(iList)

const searchindex = (ingredients) =>{
  return ingredients.ingredient == searchValue
}

console.log(recipes.map((recipe) =>recipe.ingredients.indexOf(searchindex)))



  // let index = recipes.findIndex(recipe => recipe.ingredients == searchValue)
  // console.log(index)

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