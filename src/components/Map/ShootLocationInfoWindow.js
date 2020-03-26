import React from 'react'
import { InfoWindow } from '@react-google-maps/api'
import Moment from 'react-moment';
import 'moment-timezone';
import '../../styles/infoWindow.css';
import PropTypes from 'prop-types';

function ShootLocationInfoWindow(props) {
    return (
        (props.visible === true) &&
        <InfoWindow {...props}
            position={{
                lat: props.site.location.y,
                lng: props.site.location.x
            }}
            options={{
                pixelOffset: new window.google.maps.Size(0, -45)
            }}
        >
            <div className="info-window-wrapper">
                <h1>{props.title}</h1>
                <br />
                <label>Site: </label>
                <span>{props.site.site}</span>
                <br />
                <label>Address: </label>
                <span>{props.site.address}</span>
                <br />
                <label>Shoot Date{props.site.shootDate.length > 1 ? "(s)" : ""}: </label>
                {
                    props.site.shootDate.map((shootDate, index) => {
                        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                        return <div key={index}>
                            <span>
                                <Moment format="DD MMM YYYY (UTC Z)" tz={tz}>
                                    {shootDate}
                                </Moment>
                            </span>
                            <br />
                        </div>
                    })
                }
                <br />
            </div>
        </InfoWindow>
    )
}

ShootLocationInfoWindow.propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    site: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired
};

export default ShootLocationInfoWindow;