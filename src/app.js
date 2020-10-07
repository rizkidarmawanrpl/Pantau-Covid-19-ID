import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import "lightslider/dist/css/lightslider.css";
import "bootstrap-icons/bootstrap-icons.svg";
import "datatables.net-bs4";
import "placeholder-loading/dist/css/placeholder-loading.min.css";

import "bootstrap";
import "lightslider/dist/js/lightslider.js";
import "./script/components/menu-list.js";
import main from "./script/controllers/main.js";

document.addEventListener("DOMContentLoaded", main);