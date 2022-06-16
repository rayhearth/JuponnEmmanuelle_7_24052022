export class IngredientsList {

    constructor(ingredient) {
        this.ingredient = ingredient.map((el) => el.ingredient)
        // console.log(this.ingredient)
    }

    buildIngredientsList() {

        return `<li class="list-items" data-item="${this.ingredient}" data-type="ingredient">
        ${this.ingredient}
        </li>
        `

    }
}

export class AppliancesList {
    constructor(appliance) {
        this.appliance = appliance
        // console.log(this.appliance)
    }

    buildApplianceList() {
        return `<li class="list-items" data-item="${this.appliance}" data-type="appliance">
        ${this.appliance}
        </li>
        `
    }

}

export class UstensilsList {
    constructor(ustensil) {
        this.ustensil = ustensil
        // console.log(this.ustensil)
    }

    buildUstensilList() {

        return `<li class="list-items" data-item="${this.ustensil}" data-type="ustensil">
        ${this.ustensil}
        </li>
        `
    }
}
