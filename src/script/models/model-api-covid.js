const base_url = "https://covid19.mathdro.id/api/"; //global summary
const routes = {
    og: base_url + "og", //generate a summary open graph image
    confirmed: base_url + "confirmed", //global cases per region sorted by confirmed cases
    recovered: base_url + "recovered", //global cases per region sorted by recovered cases
    deaths: base_url + "deaths", // global cases per region sorted by death toll
    daily: base_url + "daily", //global cases per day
    countries: base_url + "countries", //all countries and their ISO codes
};

class ApiCovid {
    constructor() {
    }

    static getApi(route) {
        return fetch(route)
            .then(response => {
                return response.json();
            })
            .then(responseJSON => {
                if(responseJSON.confirmed || responseJSON[0] || responseJSON.countries) {
                    return Promise.resolve(responseJSON);
                } else {
                    return Promise.reject("Data tidak ditemukan..");
                }
            })
    }

    static getSummaryGlobal() {
        const route = `${base_url}`;
        return this.getApi(route);
    }

    static getCountries(country = "Indonesia", status = "") {
        let route = `${routes.countries}/${country}`;
        if(status !== "") {
            route += "/" + status;
        }

        return this.getApi(route);
    }

    static getCountriesAll() {
        const route = `${routes.countries}`;

        return this.getApi(route);
    }
}

export default ApiCovid;