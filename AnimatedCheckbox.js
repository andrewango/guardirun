import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const AnimatedCheckbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isChecked ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isChecked]);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
          <Animated.View style={[styles.innerCircle, animatedStyle]} />
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  checked: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontWeight: '300',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10
  }
});

export default AnimatedCheckbox;
