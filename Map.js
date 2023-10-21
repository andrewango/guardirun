import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

import { GOOGLE_MAPS_API_KEY } from './ApiKeys';

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [distance, setDistanceSum] = useState(0);
  const navigation = useNavigation();

  const handleMarkerSet = (e) => {
    if (markers.length <= 10) {
        setMarkers([...markers, e.nativeEvent.coordinate]);
    }
  };

  return (
    <><MapView
      style={{ flex: 1 }}
      provider="google"
      showsUserLocation
      initialRegion={{
        latitude: 42.362590,
        longitude: -71.126260,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      userInterfaceStyle='dark'
      showsMyLocationButton
      showsTraffic
      loadingEnabled
      onPress={handleMarkerSet}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker}
          title={`Running Waypoint`}>
      ))
      }
          <Image 
      </Marker>
      {markers.length >= 2 && markers.map((marker, index) => (
        <MapViewDirections
          key={index}
          origin={markers[0]}
          destination={markers[markers.length - 1]}
          waypoints={markers.slice(1, markers.length - 1)}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={5}
          strokeColor="blue" />
      ))}
    </MapView>
      <Button style={styles.button} title="End Run" onPress={(e) => {navigation.navigate('Main');}}></Button>
      </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    color: '#4DCCF7',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
},
container: {
  flex: 0.1,
  backgroundColor: '#4DCCF7',
  alignItems: 'center',
  justifyContent: 'center',
}}
)
export default Map;
