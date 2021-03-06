import React, { Children } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import mapStyle from "./mapStyle";
import styledMapCanvas from "./styledMapCanvas.js";
import config from "../../shared/config";
import Marker from "../Marker";

const toMarkerElement = markerObj => {
  return (
    <Marker
      lat={markerObj.geo.latitude}
      lng={markerObj.geo.longitude}
      eventArray={markerObj.events}
    />
  );
};

/** Filter out events that don't happen [filterDay] from today */
const filterEventByDay = (marker, filterDay) => {
  let newEvents = marker.events.filter(event => {
    const now = new Date();
    let date = new Date(event.start_time);
    date.setDate(date.getDate() - filterDay);
    return now.getDate() === date.getDate();
  });
  return {...marker, events: newEvents};
};

/** Filter out markers that doesn't have lat/lng or any event */
const filterMarker = marker => {
  if (!marker.props.lat && !marker.props.lng) return false;
  if (marker.props.eventArray.length === 0) return false;
  return true;
};

const MapContainer = props => {
  return (
    <div style={styledMapCanvas}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: config.GOOGLE_MAP_API_KEY,
          language: "en"
        }}
        center={{ lat: props.lat, lng: props.lng }}
        zoom={props.zoom}
        options={{ styles: mapStyle, fullscreenControl: false }}
      >
        {/*TECH_DEBT(KN): Clean this shit up */}
        {Children.toArray(
          props.markers
            .map(marker => filterEventByDay(marker, props.filterDay)) //filter out events that are not in the specified date
            .map(obj => toMarkerElement(obj))
            .filter(filterMarker) // filter out markers that have empty eventArray or no lat/lng
        )}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = ({ events, map, filter }) => {
  const { lat, lng, zoom } = map;
  const { allMarkers: markers } = events;
  const { filterDay } = filter;
  return { lat, lng, zoom, markers, filterDay };
};

export default connect(mapStateToProps)(MapContainer);
