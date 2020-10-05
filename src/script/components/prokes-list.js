import "./prokes-item";

class ProkesList extends HTMLElement {
    constructor() {
        super();
        //this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set prokesList(prokes) {
        this._prokesList = prokes;
        this.render();
    }

    render() {
        this.innerHTML = "";
        this._prokesList.forEach(prokes => {
            const prokesItemElement = document.createElement("prokes-item");
            prokesItemElement.prokesItem = prokes;
            prokesItemElement.setAttribute("id", "");
            prokesItemElement.setAttribute("class", "");
            this.append(prokesItemElement);
        });
    }
};

customElements.define("prokes-list", ProkesList);