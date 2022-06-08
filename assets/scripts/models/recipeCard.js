export class RecipeCard {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance.toLowerCase()
        console.log(this.appliance)
        this.ustensils = data.ustensils
    }

    renderRecipe() {
        const card = document.createElement('article')
        card.classlist.add('card')
        card.classList.add(this.id)

        card.innerHTML =
            `<div class="card-picture">
                <img src="" alt="${this.name}">
            </div>
            <div class="card-details">
                <div class="card-header">
                    <h2>${this.name}</h2>
                    <div class="clock">
                        <img src="./assets/img/clock.svg" alt="timing recipes">
                        <p>${this.time} min</p>
                    </div>
                </div>

                <div class="card-legend">
                    <ul class="ingredients">
                ${this.ingredients.map((el) =>
                    `<li>${el.ingredient} : 
                    ${'quantity' in el ? el.quantity :''} 
                    ${'unit' in el ? el.unit :''}            
                    </li>`
                    )}          
                    </ul>
                    <div class="instructions">
                        <p>${this.description}</p>
                    </div>
                </div>
            </div>
        `
        return card
    }

}