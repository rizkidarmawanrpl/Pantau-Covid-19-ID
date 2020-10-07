import dt from "datatables.net";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import DataSettings from "../models/model-settings.js";
import menus from "../models/model-menus";
import prokes from "../controllers/prokes";
import tentang_covid from "../controllers/tentang-covid";
import api_covid from "./api-covid";

const main = () => {
    // Settings Data
    $("title").append(DataSettings.title);
    $("link").attr("href", DataSettings.favicon);
    $(".navbar-brand img").attr("src", DataSettings.logo);
    $(".navbar-brand span").append(DataSettings.name);
    $("footer p").append(DataSettings.footer);

    // Smoot scroll
    $(document).ready(function(){
        $(".nav-item a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 80
                }, 800, function(){

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    //window.location.hash = hash;
                });
            }

            $("li.nav-item").removeClass("active");
            $(this).parent().addClass("active");
        });
    });

    // get list menu
    const menuListElement = document.querySelector("menu-list");
    menuListElement.menus = menus;

    // get list protokol kesehatan
    prokes.getDataProkes();

    // get data mengenai covid 19
    tentang_covid.getTentangCovid();

    // get data statistik
    api_covid.getStatistik();

    // get data covid di semua negara
    api_covid.getCountriesCovid().then(response => {
        const elTable = $("#table_id");
        $("#table_id_body").append(response);
        elTable.DataTable();
        // remove placeholder
        $(".ph-item").remove();
        elTable.removeClass("mb-0");
    });

    // get grafik daily covid 19 updates di semua negara
    api_covid.getGlobalCovidUpdates().then(response => {
        am4core.ready(function() {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("kasus_covid_perbulan", am4charts.XYChart);

            // Add data
            chart.data = response;

            // Set input format for the dates
            chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0;
            dateAxis.keepSelection = true;
        }); // end am4core.ready()
    });

};

export default main;

// Date updates api
// Kasih warna berbeda antara value indonesia and global di statistik