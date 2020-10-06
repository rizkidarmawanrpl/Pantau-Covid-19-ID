import icon_statistik from "../models/model-icon-statistik";
import DataApiCovid from "../models/model-api-covid";

class Statistik {
    constructor() {
    }

    static getByStatus(data) {
        const n = nomor => {
            return nomor.toLocaleString("de-DE", { minimumFractionDigits: 0 });
        };

        let clsAdd = "";
        let clsName = "";
        let clsBg = "bg-white";
        if(data.judul.toLowerCase() === "total terkonfirmasi") {
            clsAdd = 'style="color: white;"';
            clsName = "statistik-terkonfirmasi";
            clsBg = "bg-primary";
        }

        const views = `
        <div class="col">
            <div class="card shadow-sm ${clsBg} rounded" ${clsAdd}>
                <div class="d-flex align-items-center h-100">
                    <div class="card-body ${clsName}">
                        <h5 class="card-title text-center judul">${data.judul}</h5>
                        <div class="row">
                            <div class="col">
                                <p class="text-center font-weight-bold">${data.counteries}</p>
                                <h5 class="text-center font-weight-bold">${n(data.value.counteries)}</h5>
                                <p class="text-center mb-0">
                                    ${data.icon}
                                </p>
                            </div>
                            <div class="col">
                                <p class="text-center font-weight-bold">Global</p>
                                <h5 class="text-center font-weight-bold">${n(data.value.global)}</h5>
                                <p class="text-center mb-0">
                                    ${data.icon}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return views;
    }

    static getStatistik() {
        const api = async () => {
            try {
                const counteries = "Indonesia";
                const resultCounteries = await DataApiCovid.getCountries("Indonesia");
                const resultGlobal = await DataApiCovid.getSummaryGlobal();
                const counteriesConfirmed = resultCounteries.confirmed.value;
                const counteriesRecovered = resultCounteries.recovered.value;
                const counteriesDeaths = resultCounteries.deaths.value;
                const globalConfirmed = resultGlobal.confirmed.value;
                const globalRecovered = resultGlobal.recovered.value;
                const globalDeaths = resultGlobal.deaths.value;

                // get data terkonfirmasi
                const dataTerkonfirmasi = {
                    judul: "Total Terkonfirmasi",
                    counteries: counteries,
                    icon: icon_statistik.terkonfirmasi,
                    value: { counteries: counteriesConfirmed, global: globalConfirmed }
                };

                // get data dalam perawatan
                const perawatanCounteries = counteriesConfirmed - (counteriesRecovered + counteriesDeaths);
                const perawatanGlobal = globalConfirmed - (globalRecovered + globalDeaths);
                const dataDalamPerawatan = {
                    judul: "Dalam Perawatan",
                    counteries: counteries,
                    icon: icon_statistik.perawatan,
                    value: { counteries: perawatanCounteries, global: perawatanGlobal }
                };

                // get data sembuh
                const dataSembuh = {
                    judul: "Total Sembuh",
                    counteries: counteries,
                    icon: icon_statistik.sembuh,
                    value: { counteries: counteriesRecovered, global: globalRecovered }
                };

                // get data pasien meninggal
                const dataMeninggal = {
                    judul: "Pasien Meninggal",
                    counteries: counteries,
                    icon: icon_statistik.meninggal,
                    value: { counteries: counteriesDeaths, global: globalDeaths }
                };

                const byStatusTerkonfirmasi = this.getByStatus(dataTerkonfirmasi);
                const byStatusPerawatan = this.getByStatus(dataDalamPerawatan);
                const byStatusSembuh = this.getByStatus(dataSembuh);
                const byStatusMeninggal = this.getByStatus(dataMeninggal);

                const views = `
                <div class="row mt-4">
                    ${byStatusTerkonfirmasi}
                    ${byStatusPerawatan}
                    ${byStatusSembuh}
                    ${byStatusMeninggal}
                </div>
                `;

                $("#app__statistik").append(views);

            } catch(message) {
                console.log(message);
            }
        };
        api();
    }
}

export default Statistik;