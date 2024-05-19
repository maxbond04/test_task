// src/App.tsx
import React from 'react';
import GoogleMapComponent from './components/MapComponent/GoogleMaps';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>My Google Map</h1>
      <GoogleMapComponent />
    </div>
  );
};

export default App;
