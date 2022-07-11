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

  recipes.forEach(element => {
    //si flag diff de index
  
    if (searchValue.length >= 3) {
      // let result = element.toString().includes(searchValue)
  
      if (element.name.toLowerCase().includes(searchValue) || element.description.includes(searchValue) || element.ingredients.concat(ingredients).includes(searchValue)) {
        searchArray.push(element)
        console.log(searchArray)
      }
  
       /* Création des recipes cards en fonction du resultat de la recherche*/
            //on parcour l'array obtenu et on instancie notre class recipeCard
            const results = searchArray.map(s => new RecipeCard(s))
            // console.log(searchArray)
            //on cree une méthode qui va gérer le html de toutes les ecttes trouvées
            const visualAll = (searchArray) => {
                let all = ''
                for (let searching of searchArray) {
                    all += searching.renderRecipe()
                }
                return all
            }
            document.querySelector('#recettes').innerHTML = visualAll(results)
      // itemArray.reduce(function(SearchArray,curr,result){
      //   if (curr === searchValue)
      //   SearchArray.push(result)
      // })
      // console.log(SearchArray)
    }
  })

  //flag peut être =-1 ou undefined--va permettre d'itérer sur un un array pour le spread l42
  // let flag = -1
  // //array vide d'ingredients
  // let ing = []
  // let app = []
  // let ust = []

  // recipes.forEach((element, index) => {
  //   //si flag diff de index
  //   if (flag != index) {
  //     //alors on stocke index de l'ing ds un array
  //     ing[index] = []
  //     app[index] = []
  //     ust[index] = []
  //     flag = index
  //   }
  //   //pour chaque item on obtient un array avec l'index de la recipe et les items de cette recipe
  //   ing[index] = [...ing[index], ...element.ingredients.map(i => i.ingredient)]
  //   app[index] = [...app[index], element.appliance]
  //   ust[index] = [...ust[index], element.ustensils.toString()]
    
  //   //on concat les trois tableaux et on enleve les doublons
  //   let itemArray = [...new Set(ing[index].concat(app[index]).concat(ust[index]).concat(element.name).concat(element.description))]
    
  //   if(searchValue.length >= 3) {
  //     itemArray.reduce(function(SearchArray,curr,result){
  //       if (curr === searchValue)
  //       SearchArray.push(result)
  //     })
  //     console.log(SearchArray)
  //     }

  //   })
    
}


principalSearch.addEventListener('input', Search)


