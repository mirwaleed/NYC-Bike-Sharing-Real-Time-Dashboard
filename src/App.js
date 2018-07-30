import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Select from 'react-select';

import Header from './components/header';
import MapComponent from './components/gmap';
import CustomBarChart from './components/charts';
import { getStationsInformation, getStationsStatus } from './services';
import { getComputedDistance, getConditionalIcon } from './shared';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      
      defaultCenter:{
        lat: 40.7208736,
        lng: -73.98085795
      },
      defaultZoom: 11,      
      markers: [],
      fixedMarkers: [],
      query: {
        station_id: null,
        distance: 2
      },
      map: undefined,
      infoWindow: {
        isOpen: false,
        isOpenIndex: null
      },
      historicalStations:[],
      isUpdate: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    this.setStationInformation();
    this.setHistoricalData();
    setInterval(this.setStationInformation.bind(this), 60000);
    setInterval(this.setHistoricalData.bind(this), 60000);
  }
  
  componentWillUnmount() {
    this.props.onRef(null);
  }

  /**
   * To fetch and store data for historical usage
   */
  async setHistoricalData() {

    let response2 = await getStationsStatus();
    let station_status = response2.data.data.stations;
    
    let stations = [];
    if(this.state.historicalStations.length < 1) {
      let response1 = await getStationsInformation();
      let station_information = response1.data.data.stations;

      station_information.forEach(element1 => {
        station_status.forEach(element2 => {
          if(element2.station_id !== element1.station_id) return;
          
          stations.push({
            id: element1.station_id,
            name: element1.name,
            data: Array(8).fill({
              num_bikes_available: element2.num_bikes_available,
              num_docks_available: element2.num_docks_available
            })
          });
        });
      });

      this.setState({
        historicalStations: stations
      });
  
    } else {
      let historicalStations = this.state.historicalStations;
      
      historicalStations.forEach(element1 => {
        station_status.forEach(element2 => {
          if(element2.station_id !== element1.id) return;

          if(element1.data.length > 7)
            element1.data.shift();

          element1['data'].push({
            num_bikes_available: element2.num_bikes_available,
            num_docks_available: element2.num_docks_available
          });

        })
      });      
      this.setState({
        historicalStations,
        isUpdate:true
      });
    }
  }
  
  /**
   * whenever the form input changes
   * 
   * @param  {} _event
   */
  handleInputChange(_event) {
    let query = this.state.query;

    if(_event.target) {
      const target = _event.target;
      query[target.name] = target.value;
    } else {
      query['station_id'] = _event.id;
    }
    
    this.setState({
      query: query
    });
  }  

   /**
    * To find distance based stations and set the state of marker and implement bounds so that the matched markers view in the map
    */
  async distanceBasedQuery() {

    let {query, map} = this.state;
    let station_id = query.station_id;
    let stations =  this.state.fixedMarkers;
    if(station_id === '' || station_id === null) return;
    
    let matchedStation = stations.find(ele => ele.id === station_id);
    let markers = await getComputedDistance(matchedStation.latlng, query.distance, stations);
    let bounds = new window.google.maps.LatLngBounds();
    
    markers.forEach(element => {
      bounds.extend(new window.google.maps.LatLng(element.latlng.lat, element.latlng.lng));
    });
    map.fitBounds(bounds);

    this.setState({
      markers,
      map
    });

    this.child1.method(matchedStation.id);
    this.child2.method(matchedStation.id);
  }
  
  /**
   * To get the data from server and set the states
   */
  async setStationInformation() {
    
    let response1 = await getStationsInformation();
    let response2 = await getStationsStatus();

    let station_information = response1.data.data.stations;
    let station_status = response2.data.data.stations;
    let stations_markers = [];
    for (const iterator of station_information) {
      for (const items of station_status) {
        if(items.station_id !== iterator.station_id) continue;

          let capacity = iterator.capacity-items.num_docks_disabled;
          let icon = getConditionalIcon(items.num_bikes_available, capacity);

          if(icon === false) continue;

          stations_markers.push({
            id: iterator.station_id,
            label: iterator.name,
            value: iterator.name,
            title: iterator.name,
            latlng:{
              lat: iterator.lat,
              lng: iterator.lon
            },
            details: {
              num_bikes_available: items.num_bikes_available,
              num_docks_available: items.num_docks_available,
              capacity: capacity,
              last_reported: moment.unix(items.last_reported).format("MM/DD/YYYY HH:mm")
            },
            icon: icon
          })
      }
    }

    this.setState({
      fixedMarkers: stations_markers,
      markers: stations_markers,
      currentLatLng: {
        lat: station_status[0].lat,
        lng: station_status[0].lon
      },
    })   
  }
  
  /**
   * Call whenever form submits
   * 
   * @param  {} _event
   */
  handleSubmit(_event) {

    _event.preventDefault();
    this.distanceBasedQuery(); 
  }
  
  /**
   * Infowindow toggling
   * 
   * @param  {} _index
   */
  onToggleOpen = (_index) => {

    let isOpen = !this.state.infoWindow.isOpen;
    let isOpenIndex = this.state.infoWindow.isOpenIndex === _index ? null : _index;
    
    this.setState({
      infoWindow: {
        isOpen,
        isOpenIndex: isOpen === false ? null : isOpenIndex
      }
    })
  }

  /**
   * Set the refrence of google map
   * 
   * @param  {} _map
   */
  onMapMounted = (_map) => {
    this.setState({
      map: _map
    }) 
  }

  render() {
    return (
      <div className="App">
        
        <Header />

        <div className="container">

          <div className="row" >
            <form onSubmit={this.handleSubmit} className="col-sm-12">

             <div className="form-row">
                <div className="col-sm-4">
                  <Select 
                    name="station_name"
                    options={this.state.fixedMarkers} 
                    isSearchable={true} 
                    placeholder={'Search by station name'} 
                    onChange={e => this.handleInputChange(e)} 
                  />
                </div>
                
                <div className="col-xs-12 col-sm-4">
                  <input type="number" className="form-control" name="distance" onChange={this.handleInputChange} min="0" step="1" placeholder="distance"/>
                </div>

                <div className="col-xs-12 col-sm-4 text-left">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>

            </form>           
          </div>

         <div className="row my-10" >
            <div className="col-sm-12 col-md-6" >
              <div className="card">
                <div className="card-header">
                  Current usage of stations
                </div>
                <div className="card-body">
                  <CustomBarChart 
                    chart={1} 
                    stations={this.state.historicalStations} 
                    onRef={ref => (this.child1 = ref)} 
                    isUpdate={this.state.isUpdate} updateState={()=>{ let isUpdate = this.state.isUpdate = !this.state.isUpdate;this.setState({isUpdate}); }} 
                  />
                </div>
              </div>
            </div>
            
            <div className="col-sm-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  Historical usage of stations(8 min)
                </div>
                <div className="card-body">
                  <CustomBarChart 
                    chart={2} 
                    stations={this.state.historicalStations} 
                    onRef={ref => (this.child2 = ref)} 
                  />
                </div>
              </div>
            </div>

          </div>
          
          <div className="row my-10">
  
            <div className="col-sm-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  Stations
                </div>
                <div className="card-body">
                  <MapComponent
                    center={this.state.defaultCenter}
                    zoom={this.state.defaultZoom}
                    markers={this.state.fixedMarkers}
                    onToggleOpen={() => console.log('toggle')}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  Seach based stations
                </div>
                <div className="card-body">
                  <MapComponent
                    center={this.state.defaultCenter}
                    zoom={this.state.defaultZoom}
                    markers={this.state.markers}
                    onMapMounted={this.onMapMounted}
                    onToggleOpen={this.onToggleOpen}
                    isOpen={this.state.infoWindow.isOpen}
                    isOpenIndex={this.state.infoWindow.isOpenIndex}
                  />
                </div>
              
              </div>
            </div>
          </div>

        </div>


    </div>
    );
  }
}

export default App;
