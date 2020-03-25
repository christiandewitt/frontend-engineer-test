import React from 'react';
import logo from './images/r7t-iso.svg';
import './App.css';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import store from './store'
import Header from './components/Header/Header';
import MapContainer from './components/Map/MapContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Helmet>
          <title>Reconnect Test</title>
        </Helmet>
        <Header title="Reconnect Test" logo={logo} />
        <MapContainer initialZoom={8} initialCenter={{lat: 35.091319, lng: -106.652455}}/>
      </div>
    </Provider>
  );
}

export default App;