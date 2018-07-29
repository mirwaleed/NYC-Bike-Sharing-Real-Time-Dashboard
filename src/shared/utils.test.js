import { getComputedDistance, getConditionalIcon } from './utils';

const icons = {
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    orange: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    red:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
}

const ComputedDistanceData = {
    latLng: {
        lat:40.76727216,
        lon:-73.99392888
    },
    distance: 2,
    stations: [
            {
                "station_id": "72",
                "name": "W 52 St & 11 Ave",
                "short_name": "6926.01",
                "latlng": {
                    "lat": 40.76727216,
                    "lon": -73.99392888,
                },
                "region_id": 71,
                "rental_methods": [
                    "CREDITCARD",
                    "KEY"
                ],
                "capacity": 39,
                "rental_url": "http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=72",
                "eightd_has_key_dispenser": false
            },
            {
                "station_id": "79",
                "name": "Franklin St & W Broadway",
                "short_name": "5430.08",
                "latlng": {
                    "lat": 40.71911552,
                    "lon": -74.00666661,
                },
                
                "region_id": 71,
                "rental_methods": [
                    "CREDITCARD",
                    "KEY"
                ],
                "capacity": 33,
                "rental_url": "http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=79",
                "eightd_has_key_dispenser": false
            },
            {
                "station_id": "82",
                "name": "St James Pl & Pearl St",
                "short_name": "5167.06",
                "latlng": {
                    "lat": 40.71117416,
                    "lon": -74.00016545,
                },
                "region_id": 71,
                "rental_methods": [
                    "CREDITCARD",
                    "KEY"
                ],
                "capacity": 27,
                "rental_url": "http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=82",
                "eightd_has_key_dispenser": false
            }
    ]
}

describe('bikes available icon', () => {
    test('when bikes greater than 75% available', () => {
        expect(getConditionalIcon(8, 10)).toEqual(icons.green);
    });
    
    test('when bikes less than 50% available', () => {
        expect(getConditionalIcon(4, 10)).toEqual(icons.orange);
    });
    
    test('when no bike available', () => {
        expect(getConditionalIcon(0, 10)).toEqual(icons.red);
    });
    
    test('when bikes available greater than 50% and lesser than 75%', () => {
        expect(getConditionalIcon(6, 10)).toEqual(false);
    });
})

describe('Give stations, search item and distance', () => {
    test('returns match array', () => {
        expect(Array.isArray(getComputedDistance(ComputedDistanceData.latLng, ComputedDistanceData.distance, ComputedDistanceData.stations))).toEqual(true);
    });
    
   
})