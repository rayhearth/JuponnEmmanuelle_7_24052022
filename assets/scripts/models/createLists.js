export class List {

    constructor(data) {
        this.ingredient = data.ingredient
        this.appliance = data.appliance
        this.ustensil = data.ustensil
        console.log(this.ustensil)
    }

    buildIngredientsList() {
        const listOfIngredients = document.createElement('li')
        listOfIngredients.classList.add('list-items')
        listOfIngredients.setAttribute('data-item', this.ingredient)
        listOfIngredients.setAttribute('data-type', 'ingredient')
        listOfIngredients.innerHTML = this.ingredient

        return listOfIngredients
    }

    
    buildApplianceList() {
        const listOfAppliances = document.createElement('li')
        listOfIngredients.classList.add('list-items')
        listOfIngredients.setAttribute('data-item', this.appliance)
        listOfIngredients.setAttribute('data-type', 'appliance')
        listOfIngredients.innerHTML = this.appliance
    
        return listOfAppliances
    }


    buildUstensilList() {
        const listOfUstensils = document.createElement('li')
        listOfUstensils.classList.add('list-items')
        listOfUstensils.setAttribute('data-item', this.ustensil)
        listOfUstensils.setAttribute('data-type', 'ustensil')
        listOfUstensils.innerHTML = this.ustensil

        return listOfUstensils
    }
}
