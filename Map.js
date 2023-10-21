import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from './ApiKeys';

const Map = () => {
    return (
<MapView
  style={{ flex: 1 }}
  provider="google"
  showsUserLocation
  initialRegion={{
    latitude: 42.362590,
    longitude: -71.126260,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  key={GOOGLE_MAPS_API_KEY}
/>
    );
};

export default Map;