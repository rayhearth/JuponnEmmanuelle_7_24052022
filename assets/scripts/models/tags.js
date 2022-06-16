export class Tags {
    constructor(name, type){
        this.name = name
        this.type = type
    }

    renderTags() {
        return 
        `
        <h3>${this.name}+${this.type}</h3>
        <button class="tagBtn">
            <img src="./assets/img/clTag.svg" alt="">
        </button>
        `

    }

}