import dt from "datatables.net";

const main = () => {
    $("#light-slider").lightSlider({
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

    $('#table_id').DataTable();
};

export default main;