
import React from 'react'
import { compose, withProps, withHandlers } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import MarkerPoint from './marker';

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    defaultOptions: {
      draggable: true,
      streetViewControl: false,
      maxZoom: 15,
      minZoom:5
    }
  }),

 
  withHandlers(() => {
    return {
      
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) =>

  <GoogleMap
    fullscreenControl= {true}
    defaultZoom={props.defaultZoom}
    defaultOptions={props.defaultOptions}
    options={props.defaultOptions}
    center={props.center}
    zoom={props.zoom}
    onIdle={props.onMapIdle}
    ref={props.onMapMounted} >

      {props.markers.map(marker => {
          return (
            <MarkerPoint
             marker={marker}
             index={marker.id} 
             key={marker.id} 
             onToggleOpen={props.onToggleOpen} 
             isOpen={props.isOpen} 
             isOpenIndex={props.isOpenIndex}
            />       
          )
        })}
        
  </GoogleMap>
)

export default MapComponent;