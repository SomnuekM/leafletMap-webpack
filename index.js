import 'leaflet/dist/leaflet.css';
import './style.css';
import * as L from 'leaflet';

var startPoint = [14.0790606839815, 100.600900053978];
var map = L.map('map').setView(startPoint, 16);

//Google
L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy;',
    minZoom: 2,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);