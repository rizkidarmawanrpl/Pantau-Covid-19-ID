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
        this.innerHTML += `<div class="row">
                                <div class="col">
                                    <div class="alert alert-warning mb-0" role="alert">
                                        ${message}
                                    </div>
                                </div>
                            </div>`;
    }
}

customElements.define("menu-list", MenuList);