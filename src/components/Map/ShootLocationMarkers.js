import React, { Component } from 'react'
import { MarkerClusterer, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types';
import ShootLocationInfoWindow from './ShootLocationInfoWindow';

class ShootLocationMarkers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            showInfoWindow: false,
            selectedSite: {
                site: null,
                address: null,
                shootDate: []
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        // Check if the title has changed, then update the state and hide the info window
        if (props.title !== state.title) {
            return {
                title: props.title,
                showInfoWindow: state.showInfoWindow
                    ? false
                    : state.showInfoWindow
            };
        }

        return null;
    }

    onMarkerClick = (site) => {
        this.setState({
            selectedSite: site,
            showInfoWindow: true
        });

        // Callback when a marker is selected
        if (this.props.onSelect instanceof Function) {
            this.props.onSelect(site);
        }
    }

    onInfoWindowClose = () => {
        if (this.state.showInfoWindow) {
            this.setState({
                showInfoWindow: false
            });
        }
    }

    render() {
        return <MarkerClusterer
            minimumClusterSize={this.props.minClusterSize || 5}
            averageCenter={true}
            maxZoom={this.props.zoom + 2}
        >
            {
                (clusterer) => this.props.locations.map((site, index) => {
                    // Check if coordinates are valid before rendering marker
                    return <Marker
                        key={index}
                        position={{
                            lat: site.location.y,
                            lng: site.location.x
                        }}
                        clusterer={clusterer}
                        onClick={(e) => this.onMarkerClick(site)}
                    >
                        <ShootLocationInfoWindow
                            visible={this.state.showInfoWindow}
                            title={this.props.title}
                            onCloseClick={this.onInfoWindowClose}
                            site={this.state.selectedSite}
                        />
                    </Marker>
                })
            }
        </MarkerClusterer>
    }
}

ShootLocationMarkers.propTypes = {
    title: PropTypes.string,
    locations: PropTypes.array.isRequired,
    minClusterSize: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    onSelect: PropTypes.func
};

export default ShootLocationMarkers;