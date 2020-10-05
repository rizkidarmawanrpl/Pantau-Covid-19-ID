class ProkesItem extends HTMLElement {
    constructor() {
        super();
        //this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set prokesItem(prokes) {
        this._prokesItem = prokes;
        this.render();
    }

    render() {
        const data = this._prokesItem;
        const html = `
        <li>
            <div class="card bg-primary text-white text-center p-4">
                <div class="d-flex align-items-center h-100">
                    <blockquote class="blockquote mb-0">
                        <p>${data.protokol_kesehatan}</p>
                        <footer class="blockquote-footer text-white">
                            <small>
                                ${data.catatan}
                            </small>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </li>
        `;
        this.innerHTML = html;
    }
}

customElements.define("prokes-item", ProkesItem);