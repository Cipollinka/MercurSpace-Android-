import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const fontSfProTextRegular = 'SFProText-Regular';




const FavouritesScreen = ({ setSelectedScreen, selectedScreen, setSelectedStar, setSelectedFavouriteStar }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [storageImage, setStorageImage] = useState(null);


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


    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        try {
            const existingFavorites = await AsyncStorage.getItem('favorites');
            if (existingFavorites) {
                setFavorites(JSON.parse(existingFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const removeFavorite = async (favoriteToRemove) => {
        try {
            const updatedFavorites = favorites.filter(fav =>
                !(fav.starTitle === favoriteToRemove.starTitle)
            );
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            // Alert.alert('Removed', 'Horoscope removed from favorites.');
        } catch (error) {
            console.error('Error removing favorite:', error);
            Alert.alert('Error', 'Failed to remove star from favorites.');
        }
    };

    useEffect(() => {
        loadFavorites();
    }, [favorites, selectedScreen]);



    return (
        <SafeAreaView style={{
            width: dimensions.width,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            width: '100%',
            zIndex: 1,
        }} >

            <View style={{
                width: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                padding: dimensions.width * 0.01,
                borderRadius: dimensions.width * 0.05,
                paddingHorizontal: dimensions.width * 0.05,
                paddingVertical: dimensions.height * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View></View>
                <Text style={{
                    fontFamily: fontSfProTextRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.07,
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    fontWeight: 800,
                    marginLeft: dimensions.width * 0.14,
                }}
                >
                    Favourites
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

            {favorites.length === 0 ? (
                <Text
                    style={{
                        fontSize: dimensions.width * 0.059,
                        fontFamily: fontSfProTextRegular,
                        color: 'white',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontWeight: 800,
                        marginTop: dimensions.height * 0.3,
                    }}>
                    No favorites yet.
                </Text>
            ) : (

                <ScrollView style={{ flex: 1, backgroundColor: '#022451', width: '100%' }}>
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        flex: 1,
                        marginTop: dimensions.height * 0.02,
                        marginBottom: dimensions.height * 0.16,
                    }}>
                        {favorites.map((favorite, index) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelectedFavouriteStar(favorite);
                                    setSelectedScreen('FavouriteStarDetails');

                                }}
                            key={index} style={{
                                width: '91%',
                                alignSelf: 'center',
                                backgroundColor: '#003F8C',
                                borderRadius: dimensions.width * 0.05,
                                position: 'relative',
                                zIndex: 1,
                                paddingVertical: dimensions.width * 0.05,
                                paddingHorizontal: dimensions.width * 0.05,
                                marginVertical: dimensions.height * 0.01,
                            }}>
                                <TouchableOpacity
                                    onPress={() => removeFavorite(favorite)}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 100,
                                        right: dimensions.width * 0.014,
                                        top: dimensions.width * 0.014,
                                    }}>
                                    <Image
                                        source={require('../assets/icons/heartInCircleIcon.png')}
                                        style={{
                                            width: dimensions.height * 0.05,
                                            height: dimensions.height * 0.05,
                                            textAlign: 'center'
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    maxWidth: '88%',
                                }}>
                                    <Text
                                        style={{
                                            fontSize: dimensions.width * 0.043,
                                            fontFamily: fontSfProTextRegular,
                                            color: 'white',
                                            textAlign: 'left',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontWeight: 800,
                                            maxWidth: '50%',
                                        }}>
                                        {favorite.starTitle}
                                    </Text>

                                    <View style={{
                                        backgroundColor: '#0d6ee6',
                                        padding: dimensions.width * 0.02,
                                        borderRadius: dimensions.width * 0.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-start'
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: dimensions.width * 0.037,
                                                fontFamily: fontSfProTextRegular,
                                                color: 'white',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontWeight: 400,
                                                paddingHorizontal: dimensions.width * 0.012,
                                            }}>
                                            {favorite.starDistanceFromEarth}
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        fontSize: dimensions.width * 0.037,
                                        fontFamily: fontSfProTextRegular,
                                        color: 'white',
                                        textAlign: 'left',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 500,
                                        marginTop: dimensions.height * 0.02,
                                    }}>
                                    {favorite.starDiscovery}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}






        </SafeAreaView>
    );
};

export default FavouritesScreen;
