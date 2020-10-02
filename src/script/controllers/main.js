
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
};

export default main;