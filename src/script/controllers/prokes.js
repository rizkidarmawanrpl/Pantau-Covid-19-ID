import DataProkes from "../models/model-prokes";

class Prokes {
    static getDataProkes() {
        const el = $("#light-slider");

        DataProkes.forEach(row => {
            const html = `
            <li>
                <div class="card bg-primary text-white text-center p-4">
                    <div class="d-flex align-items-center h-100">
                        <blockquote class="blockquote mb-0">
                            <p>${row.protokol_kesehatan}</p>
                            <footer class="blockquote-footer text-white">
                                <small>
                                    ${row.catatan}
                                </small>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </li>
            `;
            el.append(html);
        });

        el.lightSlider({
            auto: true,
            autoWidth: true,
            loop: true,
            pauseOnHover: true,
            slideMargin: 35,
            pause: 4000,
            onSliderLoad: function() {
                $('#autoWidth').removeClass('cS-hidden');
            }
        });
    }
}

export default Prokes;