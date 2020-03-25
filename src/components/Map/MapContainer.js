import React, { Component } from 'react'
import { connect } from 'react-redux';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ShootLocationMarkers from './ShootLocationMarkers';
import PropTypes from 'prop-types';

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: props.initialCenter 
        };

        this.onShootLocationSelected = this.onShootLocationSelected.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.locations && props.locations.length > 0) {
            // Get the coordinates of the first location
            const site = props.locations[0];

            return {
                center: {
                    lat: site.location.y,
                    lng: site.location.x
                }
            };
        }

        return null;
    }

    onShootLocationSelected(site) {
        this.setState({
            center: {
                lat: site.location.y,
                lng: site.location.x
            }
        });
    }

    render() {
        const containerStyle = {
            width: "100%",
            height: "calc(100% - 56px)"
        };

        return (
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={this.props.initialZoom}
                    center={this.state.center}
                >
                    <ShootLocationMarkers 
                        title={this.props.currentMovie.title}
                        locations={this.props.locations}
                        minClusterSize={this.props.minClusterSize || 5}
                        zoom={this.props.initialZoom}
                        onSelect={this.onShootLocationSelected}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}

MapContainer.propTypes = {
    initialCenter: PropTypes.object.isRequired,
    initialZoom: PropTypes.number.isRequired,
    minClusterSize: PropTypes.number
};

const mapStateToProps = state => (
    {
        currentMovie: state.movie.currentMovie,
        locations: state.movie.currentMovie.locations || []
    }
);

export default connect(mapStateToProps)(MapContainer);