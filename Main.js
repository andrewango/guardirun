import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, TextInput, Animated, Easing, ImageBackground } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";

const Main = () => {
  const [kcal, setKcal] = useState('');
  const [pressed, setPressed] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const onChangeKcal = (kcal) => {
    setKcal(kcal);
  };

  const exitKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Path');
  };

  const animatePress = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start();
    })
    navigation.navigate('Path');
  }

  return (
    <TouchableWithoutFeedback onPress={exitKeyboard}>
      <View style={styles.container}>
      {/* <ImageBackground source={require('./Black-Rock-Formation-On-Sea-Water.jpg')} style={styles.imgBackground}>
        <LinearGradient
          colors={["#09203f", "#537895"]}
          start={[0.1, 0.1]}
          style={styles.linearGradient}
        > */}
        <Text style={styles.header}>
          Guardirun
        </Text>
        <Text style={styles.headerDesc}>
          feel active, feel safe.
        </Text>
        <Text style={styles.regular}>
          How many calories would you like to burn?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter kCal from 0 to 5,000"
          keyboardType="numeric"
          value={kcal}
          onChangeText={onChangeKcal}
          maxLength={4}
        />
        {/* <TouchableOpacity onPress={handlePress} style={styles.button}> */}
          <TouchableWithoutFeedback onPress={animatePress}>
          <Animated.View style={[styles.button, { transform: [{scale: scaleValue}]}]}>
          <Text style={styles.buttonText}>Run</Text>
          </Animated.View>
          </TouchableWithoutFeedback>
        {/* </TouchableOpacity> */}
        {/* </LinearGradient>
      </ImageBackground> */}
      </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    linearGradient: {
      colors: ['#FF3F77', '#232342'], // Define your gradient colors here
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 }
    }
  },
  regular: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    textAlign: 'center',
    marginVertical: 0,
    color: 'white',
    fontWeight: '800',
    fontSize: 50,
  },
  headerDesc: {
    textAlign: 'center',
    marginBottom: 100,
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  input: {
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 200,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EFA18A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold'
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Main;
