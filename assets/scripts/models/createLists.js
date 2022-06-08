class IngredientList {

    constructor(ingredient) {
        this.ingredient = ingredient
        console.log(this.ingredient)
    }

    buildIngredientsList() {
        const listOfIngredients = document.createElement('li')
        listOfIngredients.classList.add('list-items')
        listOfIngredients.setAttribute('data-item', this.ingredient)
        listOfIngredients.setAttribute('data-type', 'ingredient')
        listOfIngredients.innerHTML = this.ingredient

        return listOfIngredients
    }
}

class ApplianceList{

    constructor(appliance) {
        this.appliance = appliance
    }
    
    buildApplianceList() {
        const listOfAppliances = document.createElement('li')
        listOfIngredients.classList.add('list-items')
        listOfIngredients.setAttribute('data-item', this.appliance)
        listOfIngredients.setAttribute('data-type', 'appliance')
        listOfIngredients.innerHTML = this.appliance
    
        return listOfAppliances
    }
}

class UstensilsList{

    constructor(ustensil) {
        this.ustensil = ustensil
    }

    buildIngredientsList() {
        const listOfUstensils = document.createElement('li')
        listOfIngredients.classList.add('list-items')
        listOfIngredients.setAttribute('data-item', this.ustensil)
        listOfIngredients.setAttribute('data-type', 'ustensil')
        listOfIngredients.innerHTML = this.ingredient

        return listOfUstensils
    }
}
