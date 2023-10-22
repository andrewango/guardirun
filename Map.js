import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, StyleSheet, Modal, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { GOOGLE_MAPS_API_KEY } from './ApiKeys';

const Map = () => {
  const [markers, setMarkers] = useState([{ latitude: 42.362590, longitude: -71.126260 }]);
  const [distanceSum, setDistanceSum] = useState(0);
  const [heatmapData, setHeatmapData] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [loading, setLoading] = useState(true);


  const navigation = useNavigation();

  const handleMarkerSet = (e) => {
    if (markers.length <= 10) {
      setMarkers([...markers, e.nativeEvent.coordinate]);
      // Increment distanceSum by 200 kCal every time a marker is added
      setDistanceSum(distanceSum + 200);
    }
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  const fetchHeatmapPredictions = useCallback(async () => {
    const heatmaps = [];

    for (let lat = 42.332590; lat < 42.422590; lat += 0.01) {
      for (let lng = -71.196260; lng < -71.056260; lng += 0.01) {
        try {
          // Make a POST request for prediction
          const postResponse = await axios.post('https://backend-image-fthvgxmzsa-uc.a.run.app/predict_crime', {
            date: "2023-10-21T22:10:06.541Z",
            lat: lat,
            lng: lng,
          });

          const prediction = postResponse.data[0]['regression'];
          console.log(lat,`, `,lng,`: `,prediction);
          heatmaps.push({ latitude: lat, longitude: lng, weight: prediction });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    setHeatmapData(heatmaps);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHeatmapPredictions();
  }, [fetchHeatmapPredictions]);

  return (
  <>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        followsUserLocation
        showsBuildings
        zoomEnabled={true}
        minZoomLevel={0}
        initialRegion={{
          latitude: 42.362590,
          longitude: -71.126260,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        userInterfaceStyle='dark'
        showsMyLocationButton
        loadingEnabled
        onPress={handleMarkerSet}
      >
        {markers && markers.map((marker, index) => (
          <Marker
            pinColor={'#FF0000'}
            key={index}
            coordinate={marker}
            title={`Running Waypoint`}
          />
        ))}

        {markers && markers.length >= 2 && markers.map((marker, index) => (
          <MapViewDirections
            key={index}
            origin={markers[0]}
            destination={markers[markers.length - 1]}
            waypoints={markers.slice(1, markers.length - 1)}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={6}
            strokeColor="#FF0000"
          />
        ))}
        {heatmapData.length >= 2 && (
          <Heatmap
            points={heatmapData}
            opacity={0.5}
            radius={900}
          />
        )}
      </MapView>

      <View style={styles.distanceSumContainer}>
        <Text style={styles.distanceSumText}>{`${distanceSum} kCal`}</Text>
      </View>

      {loading ? (
      <View style={styles.loadingContainer}>
        <Text>Retrieving Heatmap...</Text>
      </View> ) : null}

      <View style={styles.infoButtonContainer}>
        <TouchableHighlight
          style={styles.infoButton}
          onPress={toggleInfoModal}
          underlayColor="#DDDDDD"
        >
          <Text>Learn more</Text>
        </TouchableHighlight>
      </View>

      <Button
        style={styles.endRunButton}
        title="End Run"
        onPress={() => {
          navigation.navigate('Main');
        }}
      />

      <Modal
        visible={showInfoModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.infoModalContainer}>
          <View style={styles.infoModal}>
            <Text style={styles.infoText}>Select your own path using 10 waypoints with our crime and traffic heatmap, or 
                                          follow the suggested path.</Text>
            <TouchableHighlight
              style={styles.closeInfoModalButton}
              onPress={toggleInfoModal}
              underlayColor="#DDDDDD"
            >
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  distanceSumContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  distanceSumText: {
    fontWeight: 'bold',
  },
  infoButtonContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  infoButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 5
  },
  endRunButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 40
  },
  infoModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoModal: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  closeInfoModalButton: {
    alignItems: 'center',
    marginTop: 10,
  },
    loadingContainer: {
    position: 'absolute',
    top: 400,
    left: 130,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    fontWeight: 'bold'
  },
});

export default Map;
