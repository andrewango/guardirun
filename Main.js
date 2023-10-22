import React, { useState } from 'react';
import { Keyboard, TouchableOpacity, StyleSheet, TextInput, Animated, Easing, ImageBackground } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AnimatedCheckbox from './AnimatedCheckbox';

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
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
    navigation.navigate('Path');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      <ImageBackground source={require('./runner.png')} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>GuardiRun</Text>
          <Text style={styles.headerDesc}>Jogging with you, every step of the way.</Text>
          <Text style={styles.regular}>How many calories would you like to burn?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter from 0 to 5,000 kCal"
            keyboardType="numeric"
            value={kcal}
            onChangeText={onChangeKcal}
            maxLength={4}
          />
          <AnimatedCheckbox label="Round-Trip">
          </AnimatedCheckbox>
          <TouchableOpacity onPress={animatePress}>
            <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
              <Text style={styles.buttonText}>Let's Run!</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    padding: 20,
    flex: 1
  },
  regular: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 15,
  },
  header: {
    marginTop: 100,
    color: 'white',
    fontWeight: '800',
    fontSize: 50,
    marginBottom: 10,
  },
  headerDesc: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 50,
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
    color: 'white',
    borderRadius: 100,
    textAlign: 'center',
    fontSize: 20
  },
  button: {
    width: 200,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 0, 100, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Main;
