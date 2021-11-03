var $ = require("jquery");
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';
import * as L from 'leaflet';

var formatDateTime = require('./src/formatDateTime');
var timeDiffCalc = require('./src/caldiffTime');
var speedCatch = require('./src/speedCatch');

var startPoint = [14.0790606839815, 100.600900053978];
var map = L.map('map').setView(startPoint, 16);

//Google
L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy;',
    minZoom: 2,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);


function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("mySidenav").style.display = "block";
}
window.openNav = openNav;

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.display = "none";
}
window.closeNav = closeNav;

var point;

var linkJson = 'https://raw.githubusercontent.com/SomnuekM/Leaflet_MultiPoint-Color-By-Speed/main/dataJson/demoGeoJson.geojson';
var inputSpeed = 100;

if (!linkJson || !inputSpeed) {

    Swal.fire({
        icon: 'warning',
        title: 'Something went wrong!!',
        text: 'Please Input Link Json AND Speed Limit',
        showConfirmButton: false,
        timer: 2000
    });

} else {

    $.getJSON(linkJson, function(data) {

        // ⁂⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁂
        var resp = data.features;
        var dataSet = [];

        for (const i in resp) {
            dataSet.push({
                "time": resp[i].properties.id,
                "speed": resp[i].properties.speed,
                "coord": resp[i].geometry.coordinates
            });
        }
        console.log(dataSet.length + " points")
        var dateData = formatDateTime(dataSet[0].time)[0] + " - " + formatDateTime(dataSet[0].time)[1] + " to " + formatDateTime(dataSet[dataSet.length - 1].time)[1]

        $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + dataSet[0].coord[1] + '&lon=' + dataSet[0].coord[0] + '', function(data) {
            console.log(data.address.city_district);
            console.log(data);
        });


        // ⁂⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁂
        document.getElementById("speedRange").innerHTML = `<ol class="rectangle-list">
                        <li><a style='background-color: #FF0000;'> SPEED ${parseInt(inputSpeed)+1}+</a></li>
                        <li><a style='background-color: #00e600;'> SPEED 1-${inputSpeed}</a></li>
                        <li><a style='background-color: #ffaa00;'> SPEED 0</a></li>
                    </ol>`
        let set1 = speedCatch(dataSet, inputSpeed)
        console.log(set1)


        var resultText = "";
        var setDataDataTable = [];
        var DataTable = [];
        for (let j = 0; j < set1.length; j++) {
            if (set1[j].length != 0) {
                var firstArr = set1[j][0]
                var lastArr = set1[j][set1[j].length - 1]
                var timeFirstLast = formatDateTime(firstArr.time)[1] + " - " + formatDateTime(lastArr.time)[1]
                resultText += "<small>" + [j + 1] + " : " + timeFirstLast + " ⨠  </small>" + set1[j].length + " Points <br> ◷ " + timeDiffCalc(firstArr.time, lastArr.time) + "<br/>"

                setDataDataTable = {
                    date_time: formatDateTime(dataSet[0].time)[0] + " " + timeFirstLast,
                    all_points: dataSet.length.toLocaleString(),
                    points: set1[j].length,
                    time_in_over: timeDiffCalc(firstArr.time, lastArr.time)
                }
                DataTable.push(setDataDataTable);
            }

        }


        document.getElementById("results").innerHTML = "<b>Date: </b>" + dateData + "<br/><b>All: </b> " + dataSet.length.toLocaleString() + " Points<br/>" +
            "<b>OverLimit:</b><br/>" + resultText;
        // ⁂⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁂


        if (point) {
            point.removeFrom(map);
        }

        function getColor(speed) {
            return speed > inputSpeed ? '#FF0000' :
                speed > 0 ? '#00e600' :
                '#ffaa00';
        };

        point = L.geoJson(data, {

            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5.5,
                    opacity: .5,
                    color: getColor(feature.properties.speed),
                    fillColor: getColor(feature.properties.speed),
                    fillOpacity: 0.8
                })
            },
            onEachFeature: function(feature, layer) {
                layer._leaflet_id = feature.properties.id;

                var popupContent = "<p><b>" + formatDateTime(feature.properties.id)[0] + " " + formatDateTime(feature.properties.id)[1] + "</b> </br>" +
                    "<b>speed : </b>" + feature.properties.speed + "</br>";
                if (feature.properties && feature.properties.popupContent) {
                    popupContent += feature.properties.popupContent;
                }
                layer.bindPopup(popupContent);

            }

        });

        // zoom the map to the polyline
        map.fitBounds(point.getBounds());
        //Add selected points back into map as green circles.
        map.addLayer(point);

    });

}