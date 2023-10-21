import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

import { GOOGLE_MAPS_API_KEY } from './ApiKeys';

const Map = () => {
  const [markers, setMarkers] = useState([{ latitude: 42.362590, longitude: -71.126260 }]);
  const [distance, setDistanceSum] = useState(0);
  const navigation = useNavigation();

  
  const handleMarkerSet = (e) => {
    if (markers.length <= 10) {
      setMarkers([...markers, e.nativeEvent.coordinate]);
    }
  };
  
    useEffect(() => {
      let sum = 0;
      for (let i = 0; i < markers.length-1; i++) {
        sum += 
        sum += distance;
      }
      setDistanceSum(sum);
    }, [markers]);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        followsUserLocation
        showsBuildings
        zoomEnabled={false}
        minZoomLevel={10}
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
        onReady={() => {
          console.log('Hi')}}
      >
        {markers.map((marker, index) => (
          <Marker
            pinColor={'blue'}
            key={index}
            coordinate={marker}
            title={`Running Waypoint`}
          >
          </Marker>
        ))}

        {markers.length >= 2 && markers.map((marker, index) => (
          <MapViewDirections
            key={index}
            origin={markers[0]}
            destination={markers[markers.length - 1]}
            waypoints={markers.slice(1, markers.length - 1)}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={6}
            strokeColor="blue"
          />
        ))}
      </MapView>
      <Button style={styles.button} title={distance ? toString(distance) : '0'} onPress={(e) => { navigation.navigate('Main'); }}></Button>
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
