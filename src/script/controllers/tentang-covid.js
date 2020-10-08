import DataTentangCovid from "../models/model-tentang-covid";

class TentangCovid {
    constructor() {
    }

    static get getCovid() {
        const views = `
        <article class="card shadow-sm bg-white rounded mt-4 tentang">
            <div class="card-body">
                <h5 class="card-title">Yang Harus Diketahui Tentang COVID-19</h5>
                <p class="card-text text-justify">
                    ${DataTentangCovid.deskripsi}
                </p>
            </div>
        </article>
        `;

        return views;
    }

    static get getGejala() {
        const views = `
        <article class="card shadow-sm bg-white rounded mt-4 gejala">
            <div class="card-body">
                <h5 class="card-title">Gejala</h5>
                <div class="card-text">
                    ${DataTentangCovid.gejala}
                </div>
            </div>
        </article>
        `;

        return views;
    }

    static get getPenularan() {
        const views = `
        <article class="card shadow-sm bg-white rounded mt-4 penularan">
            <div class="card-body">
                <h5 class="card-title">Penularan</h5>
                <p class="card-text text-justify">
                    ${DataTentangCovid.penularan}
                </p>
            </div>
        </article>
        `;

        return views;
    }

    static getTentangCovid() {
        const el = $("#app__about");
        const covid = this.getCovid;
        const gejala = this.getGejala;
        const penularan = this.getPenularan;

        const views = `
        <div class="row">
            <div class="col-md-6">
                ${gejala}
            </div>
            <div class="col-md-6">
                ${penularan}
            </div>
        </div>
        `;

        el.append(covid);
        el.append(views);
    }
}

export default TentangCovid;