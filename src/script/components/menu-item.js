class MenuItem extends HTMLElement {
    constructor() {
        super();
        //this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set menu(menu) {
        this._menu = menu;
        this.render();
    }

    set nomor(nomor) {
        this._nomor = nomor;
    }

    render() {
        const data = this._menu;
        const no = this._nomor;
        let active;
        if(no === 0) { active = "active"; } else { active = ""; }
        this.innerHTML = `
        <li class="nav-item ${active}">
            <a class="nav-link" href="${data.link}">${data.name} <span class="sr-only">(current)</span></a>
        </li>
        `;
    }
}

customElements.define("menu-item", MenuItem);