import {StyleSheet, Dimensions} from 'react-native';
import {colors} from './color';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const btnAdd = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: HEIGHT / 50,
    alignItems: 'center',
    right: HEIGHT / 50,
    borderRadius: 100,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH / 6,
    height: WIDTH / 6,
    borderRadius: 100,
    backgroundColor: colors.black,
  },
});

export {WIDTH, HEIGHT, btnAdd};
