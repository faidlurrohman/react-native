import {StyleSheet, Dimensions} from 'react-native';
import {color} from './Colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const scale = (_number) => {
  return parseInt(_number + HEIGHT / WIDTH);
};

const font = (_type) => {
  if (_type.toLowerCase() === 'thin') {
    return 'ProximaSoft-Thin';
  }
  if (_type.toLowerCase() === 'light') {
    return 'ProximaSoft-Light';
  }
  if (_type.toLowerCase() === 'regular') {
    return 'ProximaSoft-Regular';
  }
  if (_type.toLowerCase() === 'medium') {
    return 'ProximaSoft-Medium';
  }
  if (_type.toLowerCase() === 'semibold') {
    return 'ProximaSoft-SemiBold';
  }
  if (_type.toLowerCase() === 'bold') {
    return 'ProximaSoft-Bold';
  }
  if (_type.toLowerCase() === 'extrabold') {
    return 'ProximaSoft-ExtraBold';
  }
  if (_type.toLowerCase() === 'black') {
    return 'ProximaSoft-Black';
  }
};

const indicator = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});

const signin = StyleSheet.create({
  container: {padding: 10, flex: 1},
  btnSignIn: {marginTop: 5},
  containerFooter: {flexDirection: 'row', alignSelf: 'center'},
  btnSignUp: {color: color.aqua, fontWeight: 'bold'},
});

const signup = StyleSheet.create({
  container: {padding: 10, flex: 1},
  btnSignUp: {marginTop: 10},
  containerFooter: {flexDirection: 'column'},
  containerCaption: {flexDirection: 'row', alignSelf: 'center'},
  btnSignIn: {color: color.aqua, fontWeight: 'bold'},
});

export {WIDTH, HEIGHT, scale, font, indicator, signin, signup};
