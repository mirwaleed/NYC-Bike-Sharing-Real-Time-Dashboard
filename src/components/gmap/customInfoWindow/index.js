import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

class CustomInfoWindow extends Component {

    render() {
        return (
            <InfoWindow key={this.props.index} onCloseClick={() => { this.props.onToggleOpen(this.props.index); }}>
                <div id="content">
                    <h3>{this.props.marker.title}</h3>
                    <div id="bodyContent">
                        <div><b>No. of bikes available: </b><span>{this.props.marker.details.num_bikes_available}</span></div>
                        <div><b>No. of docks available: </b><span>{this.props.marker.details.num_docks_available}</span></div>
                        <div><b>Capacity: </b><span>{this.props.marker.details.capacity}</span></div>
                        <div><b>last update: </b><span>{this.props.marker.details.last_reported}</span></div>
                    </div>
                </div>
            </InfoWindow>
        )
    }
}

export default CustomInfoWindow;