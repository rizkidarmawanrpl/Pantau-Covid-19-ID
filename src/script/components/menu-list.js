import "./menu-item";

class MenuList extends HTMLElement {
    constructor() {
        super();
        //this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set menus(menus) {
        this._menus = menus;
        this.render();
    }

    render() {
        this.innerHTML = "";
        let no = 0;
        this._menus.forEach(menu => {
            const menuItemElement = document.createElement("menu-item");
            menuItemElement.nomor = no;
            menuItemElement.menu = menu;
            this.appendChild(menuItemElement);

            no++;
        });
    }

    renderError(message) {
        this.innerHTML  = `
        <style>
        .placeholder {
            font-weight: lighter;
            color: rgba(0,0,0,0.5);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        </style>
        `;
        this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    }
}

customElements.define("menu-list", MenuList);