/**
   * return the computed distance between two latlngs
   * 
   * @param  {} _latLng1
   * @param  {} _latLng2
   * 
   * @return int 
  */
function distanceComputeKm(_latLng1, _latLng2) {

    var R = 6371;
    var φ1 = _latLng1.lat * ( Math.PI / 180);
    var φ2 = _latLng2.lat * ( Math.PI / 180);
    var Δφ = (_latLng2.lat - _latLng1.lat) * ( Math.PI / 180);
    var Δλ = (_latLng2.lon - _latLng1.lon) * ( Math.PI / 180);
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return +d.toFixed(2);
}

 /**
   * to find distance and return array of matched elements
   * 
   * @param  {} _item
   * @param  {} _distance
   * @param  {} stations
   * 
   * @return [] matched
   */
export function getComputedDistance(_item, _distance, stations) {

    let latlng = {lat: _item.lat, lon: _item.lng};

    let matched = stations.filter(ele => {
      let comparedDistance = distanceComputeKm(latlng, {lat: ele.latlng.lat, lon: ele.latlng.lng}) <= +_distance;
      if(comparedDistance)
        return ele;
      else return false
    });
    
    return matched;

}

/**
   * To get the icon for a marker based on the condition
   * 
   * @param  {} num_bikes_available
   * @param  {} _capacity
   * 
   * @return String  
   */
export function getConditionalIcon(num_bikes_available, _capacity) {
          
    let icon;

    if( num_bikes_available === 0 ) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
    else if( num_bikes_available > 0 && (_capacity * (50/100)) > num_bikes_available ) {
      
      icon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
    }
    else if( (_capacity * (75/100)) < num_bikes_available ) {
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    }
    else {
      icon = false;
    }
    
    return icon;
  }