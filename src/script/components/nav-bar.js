import DataSettings from "../models/model-settings";
import menus from "../models/model-menus";

class NavBar extends HTMLElement {
    constructor() {
        super();
        //this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();

    }

    render() {
        this.innerHTML = `
        <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white shadow-sm p-2 mb-4 bg-white rounded">
            <div class="container p-2">
                <a class="navbar-brand" href="#">
                    <img src="${DataSettings.logo}" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                    <span id="data-settings-name">${DataSettings.name}</span>
                </a>
    
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav ml-auto">
                        <menu-list></menu-list>
                    </ul>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define("nav-bar", NavBar);