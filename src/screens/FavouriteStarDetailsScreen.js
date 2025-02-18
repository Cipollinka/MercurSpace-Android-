import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Share,
    ScrollView,
    Alert,

} from 'react-native';
import { ArrowLeftIcon, } from 'react-native-heroicons/solid';



const fontSfProTextRegular = 'SFProText-Regular';

const FavouriteStarDetailsScreen = ({ setSelectedScreen, selectedFavouriteStar, selectedScreen, setSelectedFavouriteStar }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIfFavorite();
    }, [selectedScreen]);


    const checkIfFavorite = async () => {
        try {
            const existingFavorites = await AsyncStorage.getItem('favorites');
            if (existingFavorites) {
                const favorites = JSON.parse(existingFavorites);
                const isFav = favorites.some(fav => 
                    fav.starTitle === selectedFavouriteStar.starTitle && 
                    fav.starConstellation === selectedFavouriteStar.starConstellation &&
                    fav.starType === selectedFavouriteStar.starType
                );
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.error('Error checking favorites:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const favorite = {
                starTitle: selectedFavouriteStar.starTitle,
                starConstellation: selectedFavouriteStar.starConstellation,
                starType: selectedFavouriteStar.starType,
                starBrightness: selectedFavouriteStar.starBrightness,
                starDistanceFromEarth: selectedFavouriteStar.starDistanceFromEarth,
                starDiscovery: selectedFavouriteStar.starDiscovery,
            };

            const existingFavorites = await AsyncStorage.getItem('favorites');
            let newFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];

            if (isFavorite) {
                newFavorites = newFavorites.filter(fav => 
                    !(fav.starTitle === favorite.starTitle && fav.starConstellation === favorite.starConstellation 
                        && fav.starType === favorite.starType && fav.starBrightness === favorite.starBrightness && fav.starDistanceFromEarth === favorite.starDistanceFromEarth
                        && fav.starDiscovery === favorite.starDiscovery
                    )
                );
            }  else {
                newFavorites.unshift(favorite);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
            Alert.alert('Error', 'Failed to update favorites.');
        }
    };

    return (
        <View style={{
            width: dimensions.width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            zIndex: 1
        }} >
            <View style={{
                width: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                padding: dimensions.width * 0.02,
                backgroundColor: '#0C6EE6',
                borderRadius: dimensions.width * 0.05,
                paddingHorizontal: dimensions.width * 0.05,
                paddingBottom: dimensions.height * 0.03,
                paddingTop: dimensions.height * 0.035,
            }}>
                <Image
                    source={require('../assets/images/starDetailsImage.png')}
                    style={{
                        width: dimensions.height * 0.28,
                        height: dimensions.height * 0.28,
                        textAlign: 'center',
                        alignSelf: 'center',
                        marginTop: dimensions.height * 0.025,
                    }}
                    resizeMode="contain"
                />
            </View>
            <View style={{
                zIndex: 50,
                position: 'absolute',
                top: 0,
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                marginTop: dimensions.height * 0.1,
            }}>
                <TouchableOpacity
                    onPress={() => setSelectedScreen('Favourites')}
                    style={{
                        borderRadius: dimensions.width * 0.5,
                        zIndex: 100,
                    }}>
                    <Image
                        source={require('../assets/icons/leftIconInCircle.png')}
                        style={{
                            width: dimensions.height * 0.088,
                            height: dimensions.height * 0.088,
                            textAlign: 'center',
                            alignSelf: 'center',
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleFavorite}
                    style={{
                        borderRadius: dimensions.width * 0.5,
                        zIndex: 100,
                    }}>
                    <Image
                        source={isFavorite ? require('../assets/icons/heartInCircleIcon.png') : require('../assets/icons/emptyHeartIcon.png')}
                        style={{
                            width: dimensions.height * 0.088,
                            height: dimensions.height * 0.088,
                            textAlign: 'center',
                            alignSelf: 'center',
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', }}>
                <View style={{
                    marginBottom: dimensions.height * 0.25,
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '100%',
                }}>




                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.064,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 800,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingVertical: dimensions.height * 0.014,
                            marginTop: dimensions.height * 0.0021,


                        }}
                    >
                        {selectedFavouriteStar.starTitle}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            color: '#8f8f8f',
                            textAlign: 'center',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingTop: dimensions.height * 0.01,


                        }}
                    >
                        Constellation
                    </Text>


                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',

                        alignSelf: 'flex-start',
                    }}>

                        <Text
                            style={{
                                fontFamily: fontSfProTextRegular,
                                fontSize: dimensions.width * 0.041,
                                color: 'white',
                                textAlign: 'left',
                                fontWeight: 500,
                                alignSelf: 'flex-start',
                                paddingHorizontal: dimensions.width * 0.05,
                                paddingVertical: dimensions.height * 0.01,


                            }}
                        >
                            {selectedFavouriteStar.starConstellation}
                        </Text>
                    </View>


                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            color: '#8f8f8f',
                            textAlign: 'center',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingVertical: dimensions.height * 0.01,


                        }}
                    >
                        Type
                    </Text>

                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.041,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingBottom: dimensions.height * 0.012,


                        }}
                    >
                        {selectedFavouriteStar.starType}
                    </Text>


                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            color: '#8f8f8f',
                            textAlign: 'center',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingVertical: dimensions.height * 0.01,


                        }}
                    >
                        Brightness
                    </Text>

                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.041,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingBottom: dimensions.height * 0.012,


                        }}
                    >
                        {selectedFavouriteStar.starBrightness}
                    </Text>


                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            color: '#8f8f8f',
                            textAlign: 'center',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingVertical: dimensions.height * 0.01,


                        }}
                    >
                        Distance from Earth
                    </Text>

                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.041,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingBottom: dimensions.height * 0.012,


                        }}
                    >
                        {selectedFavouriteStar.starDistanceFromEarth}
                    </Text>


                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.037,
                            color: '#8f8f8f',
                            textAlign: 'center',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingVertical: dimensions.height * 0.01,


                        }}
                    >
                        Discovery
                    </Text>
                    <Text
                        style={{
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.041,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: 500,
                            alignSelf: 'flex-start',
                            paddingHorizontal: dimensions.width * 0.05,
                            paddingBottom: dimensions.height * 0.012,


                        }}
                    >
                        {selectedFavouriteStar.starDiscovery}
                    </Text>




                </View>

            </ScrollView>
        </View>
    );
};

export default FavouriteStarDetailsScreen;
