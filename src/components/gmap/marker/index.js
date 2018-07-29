
import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import CustomInfoWindow from '../customInfoWindow';

class MarkerPoint extends Component {
    render() {
        return (
            <Marker
                position={this.props.marker.latlng}
                title={this.props.marker.title}
                icon={this.props.marker.icon}
                onClick={() => { this.props.onToggleOpen(this.props.index);}}
            >
            { 
                this.props.isOpen && this.props.isOpenIndex === this.props.index && 
                    <CustomInfoWindow
                        marker={this.props.marker} 
                        onToggleOpen={this.props.onToggleOpen} 
                        key={this.props.index}
                    /> 
            }
            </Marker>
        );
    }
}

export default MarkerPoint;