import recipes from "./recipes"

export default {
    
    Search(){
        

        let searchArray = []

        const research = principalSearch

        if(searchValue.lenght>=3){
            for (let recipe of recipes){
                if(recipe.name.toLocaleLowerCase().includes(searchValue)||
                recipe.description.includes(searchValue)||
                recipe.ingredients.forEach((ingredient)=>{
                    ingredient.ingredient.toLocaleLowerCase().includes(searchValue)
                }))
                searchArray.push(recipe)
            }
            let array
        }

    }
}
