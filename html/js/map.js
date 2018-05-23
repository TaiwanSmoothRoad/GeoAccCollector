var _map = {};

function mapini() {
    _map = L.map('map', { zoomControl: false }).setView([25.058, 121.524], 17);
    L.control.zoom(false);
    //https://{s}.tile.openstreetmap.org/${z}/${x}/${y}.png 
    //https: //tiles.wmflabs.org/bw-mapnik/${z}/${x}/${y}.png
    L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        //L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        maxZoom: 18,
        zoomControl: false,
        attribution: '&copy;OpenStreetMap'
    }).addTo(_map);

    // L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    //     maxZoom: 18,
    //     zoomControl: false,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(_map);
    // console.log(Cookies.get("uuid"));
}

function drawPolyLine(data, center) {
    if (data.points.length > 1) {
        try {
            //console.log('drawPolyLine');
            // var polyLine = new L.polyline(
            //     data.points, {
            //         color: this._hsv((3 - data.smooth_index), 0, 3, 120),
            //         //opacity: 1.0,
            //         weight: 3,
            //         //lineCap: 'round'
            //     }).addTo(_map);
            var decorator = new L.polylineDecorator(data.points, {
                patterns: [{
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({ pixelSize: 5, polygon: false, pathOptions: { stroke: true, color: this._hsv((3 - data.smooth_index), 0, 3, 120) } })
                }]
            }).addTo(_map);

            if (center == true) {
                //alert('setcenter');            
                _map.panTo(new L.LatLng(parseFloat(data.points[0][0]), parseFloat(data.points[0][1])));
            }
            // let contentStr = this._createInfowindowContentStr(data);
            // decorator.bindPopup(contentStr);
            //this._nowOnMapThings.push(decorator)
            //this._nowOnMapThings.push(polyLine)
        } catch (err) { alert(err); }
    } else {
        console.log('points num < 2');
    }
}

function _hsv(a, min, max, angle) {
    let H = (a - min) / (max - min) * angle
    let Hp = H / 60
    let X = (255.0 * (1 - Math.abs(Hp % 2 - 1)))
    X = parseInt(X)
    let c
    if (Hp >= 0 && Hp < 1) {
        c = "rgba(" + 255 + ", " + X + ", 0, 1)"
    } else if (Hp >= 1 && Hp < 2) {
        c = "rgba(" + X + ", 255, 0, 1)"
    } else if (Hp >= 2 && Hp < 3) {
        c = "rgba(0, 255, " + X + ", 1)"
    } else if (Hp >= 3 && Hp < 4) {
        c = "rgba(0, " + X + ", 255, 1)"
    } else if (Hp >= 4 && Hp < 5) {
        c = "rgba(" + X + ", 0, 255, 1)"
    } else if (Hp >= 5 && Hp < 6) {
        c = "rgba(255, 0, " + X + ", 1)"
    }
    return c;
}