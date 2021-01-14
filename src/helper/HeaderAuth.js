import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {scale, font} from '../css/Style';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../css/Colors';

const HeaderAuth = (props) => {
  const sceneRoute = props.scene.route.name;
  const bgColor = props.scene.route.params.bgColor;

  return (
    <View
      style={{
        paddingHorizontal: scale(18),
        paddingVertical: scale(14),
        flexDirection: 'row',
        backgroundColor: bgColor,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        activeOpacity={0.8}
        onPress={() => props.navigation.goBack()}>
        <Entypo
          name="chevron-left"
          color={color.whiteOpacity}
          size={scale(18)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
        activeOpacity={0.8}
        onPress={() =>
          props.navigation.navigate(
            sceneRoute === 'SignIn' ? 'SignUp' : 'SignIn',
            {bgColor},
          )
        }>
        <Text
          style={{
            fontSize: scale(12),
            fontFamily: font('bold'),
            letterSpacing: 1,
            color: color.whiteOpacity,
          }}>
          {sceneRoute === 'SignIn'
            ? 'Dont have an account?'
            : 'Have an account?'}
        </Text>
        <Text
          style={{
            fontSize: scale(14),
            fontFamily: font('bold'),
            letterSpacing: 1,
            color: color.white,
          }}>
          {sceneRoute === 'SignIn' ? 'SIGN UP' : 'SIGN IN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderAuth;
