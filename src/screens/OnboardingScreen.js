import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Text, Image, Dimensions, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowRightIcon } from 'react-native-heroicons/solid';

const fontSfProTextRegular = 'SFProText-Regular';

const OnboardingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };

    const dimensionListener = Dimensions.addEventListener('change', onChange);

    return () => {
      dimensionListener.remove();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, dimensions.width * 0.88 - dimensions.width * 0.19));
        pan.setValue({ x: newX, y: 0 });
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > dimensions.width * 0.44) {
          navigation.replace('Home');
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <View
      style={{ justifyContent: 'center', flex: 1, backgroundColor: '#212121', alignItems: 'center', height: dimensions.height, backgroundColor: '#022451' }}
    >
      <Image
        resizeMode="contain"
        source={require('../assets/images/splash4x.png')}
        style={{
          marginBottom: 15.8,
          height: dimensions.width * 0.88,
          width: dimensions.width * 0.88,
        }}
        
      />

      <View
        style={{
          bottom: '7%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: '#0C6EE6',
          paddingVertical: dimensions.height * 0.008,
          width: dimensions.width * 0.88,
          borderRadius: dimensions.width * 0.5,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            pan.getLayout(),
            {
              padding: dimensions.height * 0.01,
              borderRadius: dimensions.width * 0.5,
              backgroundColor: 'white',

              alignItems: 'center',

              marginLeft: dimensions.width * 0.01,
            },
          ]}
        >
          <ArrowRightIcon size={dimensions.height * 0.05} color='#0C6EE6' />
        </Animated.View>
        <Text
          style={{
            fontFamily: fontSfProTextRegular,
            color: 'white',
            fontSize: dimensions.width * 0.05,
            textAlign: 'center',
            fontWeight: '600',

            position: 'absolute',
            left: '44%',
          }}
        >
          Next
        </Text>
      </View>
    </View>
  );
};

export default OnboardingScreen;
