
const main = () => {
    $("#light-slider").lightSlider({
        auto: true,
        autoWidth: true,
        loop: true,
        pauseOnHover: true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        }
    });
};

export default main;