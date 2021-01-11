import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color} from '../css/Colors';
import {scale, WIDTH} from '../css/Style';

const OnboardSlide = (props) => {
  return (
    <View
      style={[styles.container, {backgroundColor: props.bgClr, width: WIDTH}]}>
      <View
        style={{
          flex: scale(1),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{props.lbl}</Text>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default OnboardSlide;
