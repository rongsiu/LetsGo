import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

class GMap extends React.Component {
  constructor(props) {
    super(props)

    this.getGoogleMaps = this.getGoogleMaps.bind(this);
    this.initMap = this.initMap.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

   getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        window.resolveGoogleMapsPromise = () => {
          resolve(google);
          delete window.resolveGoogleMapsPromise;
        };

        const script = document.createElement("script");
        const API = 'AIzaSyAk3-xT3bzRNW5oE3858RuvT1ZqJBk-844';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    return this.googleMapsPromise;
  }



  componentDidMount() {
    this.getGoogleMaps().then(google => {
      this.initMap()
    });
  }


  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log('calculate')
    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  initMap() {
    console.log('inti')
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    var control = document.getElementById('floating-panel');

    var onChangeHandler = () => {
      this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
  }




  render() {
    return (
      <div className="container">
        <div id="floating-panel">
        <strong>Start:</strong>
        <select id="start">
          <option value="chicago, il">Chicago</option>
          <option value="st louis, mo">St Louis</option>
          <option value="joplin, mo">Joplin, MO</option>
          <option value="oklahoma city, ok">Oklahoma City</option>
          <option value="amarillo, tx">Amarillo</option>
          <option value="gallup, nm">Gallup, NM</option>
          <option value="flagstaff, az">Flagstaff, AZ</option>
          <option value="winona, az">Winona</option>
          <option value="kingman, az">Kingman</option>
          <option value="barstow, ca">Barstow</option>
          <option value="san bernardino, ca">San Bernardino</option>
          <option value="los angeles, ca">Los Angeles</option>
        </select>
        <br/>
        <strong>End:</strong>
        <select id="end">
          <option value="chicago, il">Chicago</option>
          <option value="st louis, mo">St Louis</option>
          <option value="joplin, mo">Joplin, MO</option>
          <option value="oklahoma city, ok">Oklahoma City</option>
          <option value="amarillo, tx">Amarillo</option>
          <option value="gallup, nm">Gallup, NM</option>
          <option value="flagstaff, az">Flagstaff, AZ</option>
          <option value="winona, az">Winona</option>
          <option value="kingman, az">Kingman</option>
          <option value="barstow, ca">Barstow</option>
          <option value="san bernardino, ca">San Bernardino</option>
          <option value="los angeles, ca">Los Angeles</option>
        </select>
      </div>
      <div class="mapView">
        <div id="right-panel"></div>
        <div id="map"></div>
      </div>
    </div>
  )}
}

export default GMap;