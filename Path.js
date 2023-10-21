import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Map from './Map';
const Path = () => {
  return (
      <><View>
      <Text>Hello</Text>
    </View>
    <SafeAreaView style={{flex: 1}}>
    <Map></Map>
    </SafeAreaView>
    </>
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
