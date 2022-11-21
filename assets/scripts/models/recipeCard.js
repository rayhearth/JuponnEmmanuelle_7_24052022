export class RecipeCard {
    constructor({ id, name, servings, ingredients, time, description, appliance, ustensils }) {
        this.id = id
        this.name = name
        this.servings = servings
        this.ingredients = ingredients
        this.time = time
        this.description = description
        this.appliance = appliance
        this.ustensils = ustensils
        this.visible = true
    }


    //création de la carte des recipes
    renderRecipe() {
        return `<article class="card" id='${this.id}'>
                <div class="card-picture">
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


    renderTags() {
        return `
            <li class="tagSelect">
                <h3>${currentTag}</h3>
                <button class="tagBtn">
                <img src="./assets/img/clTag.svg" alt="">
                </button>
            </li>`
    }

    // limite de texte pour la description
    ellipsis() {
        //creation variable de la desc
        let text = this.description
        //on diminue les espace ds le texte
        text = text.replace(/  +/g, '')
        //si le texte est plus long que 200 caract
        if (text.length > 200) {
            //on coupe les x der caract
            text = text.substr(0, 210)
            // on coupe à nouveau le der mot s'il a été coupé en 2
            text = text.substr(0, Math.min(text.length, text.lastIndexof('')))
            // on retourne le texte coupé avec 3 caract à la fin
            return text + '...'
        } else {
            return text
        }
    }
}