import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Share,
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import StarDetailsScreen from './StarDetailsScreen';
import FavouritesScreen from './FavouritesScreen';
import { id } from 'date-fns/locale';
import GameScreen from './GameScreen';
import FavouriteStarDetailsScreen from './FavouriteStarDetailsScreen';


const homePagesButtons = [
  { screen: 'Game', iconImage: require('../assets/icons/homeButtons/homeIcon.png') },
  { screen: 'Map', iconImage: require('../assets/icons/homeButtons/mapIcon.png') },
  { screen: 'Favourites', iconImage: require('../assets/icons/homeButtons/favouritesIcon.png') },
  { screen: 'Profile', iconImage: require('../assets/icons/homeButtons/profileIcon.png') },
];

const zodiacs = [
  {
    id: 1,
    title: 'Aries',
    image: require('../assets/images/zodiacsImages/ariesImage.png'),
    period: 'March 21 - April 19',
  },
  {
    id: 2,
    title: 'Taurus',
    image: require('../assets/images/zodiacsImages/taurusImage.webp'),
    period: 'April 20 - May 20',
  },
  {
    id: 3,
    title: 'Gemini',
    image: require('../assets/images/zodiacsImages/geminiImage.webp'),
    period: 'May 21 - June 20',
  },
  {
    id: 4,
    title: 'Cancer',
    image: require('../assets/images/zodiacsImages/cancerImage.png'),
    period: 'June 21 - July 22',
  },
  {
    id: 5,
    title: 'Leo',
    image: require('../assets/images/zodiacsImages/leoImage.png'),
    period: 'July 23 - August 22',
  },
  {
    id: 6,
    title: 'Virgo',
    image: require('../assets/images/zodiacsImages/virgoImage.png'),
    period: 'August 23 - September 22',
  },
  {
    id: 7,
    title: 'Libra',
    image: require('../assets/images/zodiacsImages/libraImage.png'),
    period: 'September 23 - October 22',
  },
  {
    id: 8,
    title: 'Scorpio',
    image: require('../assets/images/zodiacsImages/scorpioImage.png'),
    period: 'October 23 - November 21',
  },
  {
    id: 9,
    title: 'Sagittarius',
    image: require('../assets/images/zodiacsImages/sagittariusImage.png'),
    period: 'November 22 - December 21',
  },
  {
    id: 10,
    title: 'Capricorn',
    image: require('../assets/images/zodiacsImages/capricornImage.png'),
    period: 'December 22 - January 19',
  },
  {
    id: 11,
    title: 'Aquarius',
    image: require('../assets/images/zodiacsImages/aquariusImage.png'),
    period: 'January 20 - February 18',
  },
  {
    id: 12,
    title: 'Pisces',
    image: require('../assets/images/zodiacsImages/piscesImage.png'),
    period: 'February 19 - March 20',
  }
];


const fontSfProTextRegular = 'SFProText-Regular';

const HomeScreen = () => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Game');

  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedFavouriteStar, setSelectedFavouriteStar] = useState(null);
  const [storageImage, setStorageImage] = useState(null);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [currentConstellation, setCurrentConstellation] = useState(null);
  const [currentConstellationId, setCurrentConstellationId] = useState(0);


  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await AsyncStorage.getItem('UserProfile');
        if (userProfile !== null) {
          const { image } = JSON.parse(userProfile);

          setStorageImage(image);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, [selectedScreen]);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#022451',
    }}>

      {selectedScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          paddingTop: dimensions.width * 0.01,
          width: '100%'
        }}>
          <View style={{
            width: '100%',
            borderRadius: dimensions.width * 0.05,
            alignSelf: 'center',
            alignItems: 'center',
            paddingHorizontal: dimensions.width * 0.05,
            paddingVertical: dimensions.height * 0.01,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: dimensions.width * 0.01,
          }}>
            <View>

            </View>
            <Text style={{
              fontFamily: fontSfProTextRegular,
              color: 'white',
              fontWeight: 800,
              fontSize: dimensions.width * 0.07,
              alignItems: 'center',
              alignSelf: 'center',
              marginLeft: dimensions.width * 0.14,
              textAlign: 'center',
            }}
            >
              Home
            </Text>
            <Image
              source={storageImage
                ? { uri: storageImage }
                : require('../assets/images/noImage.png')}
              style={{
                width: dimensions.height * 0.07,
                height: dimensions.height * 0.07,
                textAlign: 'center',
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.5,
              }}
              resizeMode="stretch"
            />

          </View>



          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: dimensions.height * 0.01,
          }}>
            {zodiacs.map((zodiac, index) => (
              <TouchableOpacity
                key={zodiac.id}
                onPress={() => {
                  setSelectedZodiac(zodiac);
                  setSelectedScreen('HoroscopeDetails');
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: dimensions.width * 0.055,
                  backgroundColor: '#003F8C',
                  width: dimensions.width * 0.46,
                  margin: dimensions.width * 0.01,

                }}>
                <Text
                  style={{
                    fontFamily: fontSfProTextRegular,
                    textAlign: "center",
                    fontSize: dimensions.height * 0.03,
                    alignSelf: 'center',
                    fontWeight: 800,
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: dimensions.width * 0.03,
                  }}
                >
                  {zodiac.title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontSfProTextRegular,
                    textAlign: "center",
                    fontSize: dimensions.width * 0.03,
                    alignSelf: 'center',
                    fontWeight: 300,
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: dimensions.width * 0.01,
                    paddingBottom: dimensions.height * 0.025,
                  }}
                >
                  {zodiac.period}
                </Text>

              </TouchableOpacity>
            ))}
          </View>






        </SafeAreaView>
      ) : selectedScreen === 'Profile' ? (
        <ProfileScreen setSelectedScreen={setSelectedScreen} />
      ) : selectedScreen === 'Map' ? (
        <MapScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} selectedStar={selectedStar} setSelectedStar={setSelectedStar} setSelectedFavouriteStar={setSelectedFavouriteStar}/>
      ) : selectedScreen === 'StarDetails' ? (
        <StarDetailsScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} selectedStar={selectedStar} setSelectedStar={setSelectedStar} />
      ) : selectedScreen === 'FavouriteStarDetails' ? (
        <FavouriteStarDetailsScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} setSelectedStar={setSelectedStar} selectedFavouriteStar={selectedFavouriteStar} setSelectedFavouriteStar={setSelectedFavouriteStar}/>
      ) : selectedScreen === 'Favourites' ? (
        <FavouritesScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} setSelectedStar={setSelectedStar} selectedFavouriteStar={selectedFavouriteStar} setSelectedFavouriteStar={setSelectedFavouriteStar}/>
      ) : selectedScreen === 'Game' ? (
        <GameScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} currentConstellation={currentConstellation} setCurrentConstellation={setCurrentConstellation} currentConstellationId={currentConstellationId} setCurrentConstellationId={setCurrentConstellationId}
        />
      ) : null}

      {selectedScreen !== 'StarDetails' && selectedScreen !== 'HoroscopeDetails' && (

        <View
          style={{
            position: 'absolute',
            bottom: '2.5%',
            backgroundColor: '#011c4a',
            width: '86%',
            paddingHorizontal: dimensions.width * 0.03,
            borderRadius: dimensions.width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            paddingVertical: dimensions.height * 0.004,
            zIndex: 5000

          }}
        >
          {homePagesButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedScreen(button.screen)}
              style={{
                borderRadius: dimensions.width * 0.5,
                padding: dimensions.height * 0.019,
                alignItems: 'center',
                marginHorizontal: 5,
                backgroundColor: selectedScreen === button.screen ? '#0C6EE6' : 'transparent',
                shadowColor: '#000',
                shadowOffset: {
                  width: dimensions.width * 0.01,
                  height: dimensions.height * 0.01,
                },
                shadowOpacity: 0.3,
              }}
            >
              <Image
                source={button.iconImage}
                style={{
                  width: dimensions.height * 0.03,
                  height: dimensions.height * 0.03,
                  textAlign: 'center'
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
