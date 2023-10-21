import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from './Map';
const Path = () => {
  return (
      <Map></Map>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Path;
