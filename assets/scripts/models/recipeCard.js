export class RecipeCard {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance.toLowerCase()
        // console.log(this.appliance)
        this.ustensils = data.ustensils
    }


    //création de la carte des recipes
    renderRecipe() {
        return `<article class="card">
                <div class="card-picture">
                    <img src="" alt="${this.name}"/>
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
                                `<li><strong>${el.ingredient} :</strong> 
                                    ${'quantity' in el ? el.quantity : ''} 
                                    ${'unit' in el ? el.unit : ''}            
                                </li>`
                            ).join('')}
                        </ul>
                        <div class="instructions">
                            <p>${this.description}</p>
                        </div>
                    </div>
                </div>
            </article>
        `
    }

    // limite de texte pour la description
    ellipsis () {
        //creation variable de la desc
        let text = this.description
        //on diminue les espace ds le texte
        text = text.replace(/  +/g, '')
        //si le texte est plus long que 200 caract
        if(text.length > 200){
            //on coupe les x der caract
            text = text.substr(0,210)
            // on coupe à nouveau le der mot s'il a été coupé en 2
            text = text.substr(0, Math.min(text.length , text.lastIndexof('')))
            // on retourne le texte coupé avec 3 caract à la fin
            return text + '...'
        } else{
            return text
        }
    }
}