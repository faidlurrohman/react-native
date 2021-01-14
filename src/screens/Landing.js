import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {color} from '../css/Colors';
import {scale, font, WIDTH} from '../css/Style';
import OnboardSlide from '../helper/OnboardSlide';

const Landing = ({navigation}) => {
  const slides = [
    {bg: '#31A9B8', lbl: '1'},
    {bg: '#258039', lbl: '2'},
    {bg: '#F5BE41', lbl: '3'},
    {bg: '#CF3721', lbl: '4'},
  ];

  const numItems = slides.length;
  const itemWidth = WIDTH / numItems - (numItems - 1) * scale(6);
  const animVal = new Animated.Value(0);
  const fadeView = useRef(new Animated.Value(0)).current;
  const [elevationAndroid, setElevationAndroid] = useState(0);
  const [elevationBar, setElevationBar] = useState(0);

  const SlideComponents = () => {
    return slides.map((item, index) => {
      return <OnboardSlide key={index} bgClr={item.bg} lbl={item.lbl} />;
    });
  };

  useEffect(() => {
    Animated.timing(fadeView, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setElevationAndroid(1);
      setElevationBar(1);
    });
  }, [fadeView]);

  const BarComponents = () => {
    return slides.map((item, index) => {
      const scrollBarVal = animVal.interpolate({
        inputRange: [WIDTH * (index - 1), WIDTH * (index + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      });
      const onBar = (
        <View
          key={index}
          style={[
            styles.track,
            {
              backgroundColor: color.whiteOpacity,
              width: itemWidth,
              marginLeft: index === 0 ? 0 : scale(6),
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                backgroundColor: color.white,
                elevation: elevationBar,
                width: itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
      return onBar;
    });
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.slideContainer}>
        <ScrollView
          horizontal
          snapToInterval={WIDTH}
          decelerationRate="fast"
          bounces={false}
          alwaysBounceHorizontal={false}
          bouncesZoom={false}
          pagingEnabled
          scrollEnabled
          scrollEventThrottle={10}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: animVal}}}],
            {useNativeDriver: false},
          )}>
          <SlideComponents />
        </ScrollView>
      </View>
      <Animated.View style={[styles.footer, {width: WIDTH, opacity: fadeView}]}>
        <View style={styles.barContainer}>
          <BarComponents />
        </View>
        <TouchableOpacity
          onPress={() => navigation.push('SignUp')}
          activeOpacity={0.8}
          style={[styles.btnSignUp, {elevation: elevationAndroid}]}>
          <Text style={styles.textSignUp}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.belowSignUp}>
          <Text style={styles.alreadyText}>Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.push('SignIn')}>
            <Text style={styles.textSignIn}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
  },
  btnSignUp: {
    paddingVertical: scale(18),
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: scale(5),
  },
  textSignUp: {
    fontSize: scale(16),
    fontFamily: font('bold'),
    letterSpacing: 1,
    color: color.aqua,
  },
  belowSignUp: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: scale(1),
    paddingVertical: scale(14),
  },
  alreadyText: {
    fontSize: scale(14),
    fontFamily: font('medium'),
    letterSpacing: 1,
    color: color.white,
  },
  textSignIn: {
    fontSize: scale(14),
    fontFamily: font('bold'),
    letterSpacing: 1,
    color: color.white,
  },
  footer: {
    position: 'absolute',
    paddingHorizontal: scale(18),
    bottom: 0,
  },
  barContainer: {
    alignSelf: 'center',
    paddingVertical: scale(20),
    flexDirection: 'row',
    width: WIDTH,
    justifyContent: 'center',
  },
  track: {
    overflow: 'hidden',
    height: scale(8),
    borderRadius: scale(100),
  },
  bar: {
    borderRadius: scale(100),
    height: scale(8),
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default Landing;
