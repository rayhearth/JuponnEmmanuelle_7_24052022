import recipes from './recipes.js'

recipes: []
const principalSearch = document.querySelector('#search')
let searchValue=''

let Search = () => {
    
    searchValue = principalSearch.value.trim().toLowerCase()
    let searchArray = []



    if (searchValue.length >= 3) {
        for (let i=0; i< recipes.length; i++) {
            if(recipes[i].name.toLowerCase().includes(searchValue)||recipes[i].description.includes(searchValue)){
                searchArray.push(recipes[i])
            } else {
                for (let r=0; r<recipes[i].ingredients.length; r++ ){
                    if(recipes[i].ingredients[r].ingredient.toLowerCase().includes(searchValue)){
                        searchArray.push(recipes[i])
                        break
                    }
                }
            } 
            
            // searchArray = recipes
        }
        // if (searchArray.length == 0) {
        //     return `<div class="noResults hidden">
        //         <p> Aucune recette ne correspond à vos critères de recherche.<br>Vous pouvez chercher « tarte aux pommes
        //         »,« poisson », etc.</p>
        //         </div>`

        // }
    }

}

principalSearch.addEventListener('input', Search)

