import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const fontSfProTextRegular = 'SFProText-Regular';

const stars = [
    {
        id: 1,
        title: 'Sirius',
        top: '5%',
        left: '40%',
        constellation: 'Canis Major',
        type: 'Blue-white star',
        brightness: 'The brightest star in the night sky',
        distanceFromEarth: '~8.6 light-years',
        discovery: 'Known since ancient times; described in the works of ancient Greeks around 2000 BC.',
    },
    {
        id: 2,
        title: 'Alpha Centauri',
        top: '15%',
        left: '14%',
        constellation: 'Centaurus',
        type: 'A system of three stars (Alpha Centauri A, B, and Proxima Centauri)',
        brightness: 'The second brightest star in the night sky (Alpha Centauri A)',
        distanceFromEarth: '~4.37 light-years',
        discovery: 'Known since ancient times; first described in the 16th century.',
    },
    {
        id: 3,
        title: 'Polaris (North Star)',
        top: '25%',
        left: '55%',
        constellation: 'Ursa Minor',
        type: 'Yellow giant',
        brightness: 'Moderately bright, important for navigation',
        distanceFromEarth: '~433 light-years',
        discovery: 'Known since ancient times and used by sailors for navigation.',
    },
    {
        id: 4,
        title: 'Betelgeuse',
        top: '30%',
        left: '75%',
        constellation: 'Orion',
        type: 'Red supergiant',
        brightness: 'One of the brightest objects in the night sky',
        distanceFromEarth: '~642 light-years',
        discovery: 'Described in ancient Greek astronomical texts.',
    },
    {
        id: 5,
        title: 'Vega',
        top: '46%',
        left: '10%',
        constellation: 'Lyra',
        type: 'Blue-white star',
        brightness: 'One of the brightest stars in the night sky',
        distanceFromEarth: '~25 light-years',
        discovery: 'Known since ancient times; first studied in the 19th century.',
    },
    {
        id: 6,
        title: 'Capella',
        top: '53%',
        left: '37%',
        constellation: 'Auriga',
        type: 'Blue-white star',
        brightness: 'Binary star (two yellow giants)',
        distanceFromEarth: '~42 light-years',
        discovery: 'Known since ancient times; described in the works of Ptolemy.',
    },
    {
        id: 7,
        title: 'Antares',
        top: '64%',
        left: '70%',
        constellation: 'Scorpius',
        type: 'Red supergiant',
        brightness: 'Bright star, known for its red color',
        distanceFromEarth: '~550 light-years',
        discovery: 'Known since ancient times, mentioned in astronomical texts.',
    },
    {
        id: 8,
        title: 'Regulus',
        top: '75%',
        left: '52%',
        constellation: 'Leo',
        type: 'Blue-white star',
        brightness: 'One of the brightest stars in its constellation',
        distanceFromEarth: '~79 light-years',
        discovery: 'Known to ancient Egyptians, described in the 2nd century BC.',
    },
    {
        id: 9,
        title: 'Sirius B',
        top: '82%',
        left: '19%',
        constellation: 'Sirius B',
        type: 'White dwarf',
        brightness: 'Fainter than Sirius, but historically significant',
        distanceFromEarth: '~8.6 light-years',
        discovery: 'Discovered in 1862 as a companion to Sirius.',
    },
    {
        id: 10,
        title: 'Formalhaut',
        top: '88%',
        left: '80%',
        constellation: 'Pisces',
        type: 'White star',
        brightness: 'Bright star surrounded by a dust disk',
        distanceFromEarth: '~25 light-years',
        discovery: 'Known since ancient times; identified as a star with a disk in 1983.',
    }
]



const MapScreen = ({ setSelectedScreen, routes, selectedScreen, selectedStar, setSelectedStar }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [storageImage, setStorageImage] = useState(null);


    useEffect(() => {
        console.log('selectedStar:', selectedStar);
    }, [selectedStar])


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
                    Map
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
                width: dimensions.width,
                height: dimensions.height * 0.7,
                position: 'relative',
            }}>
                <Image
                    source={require('../assets/images/spaceImage.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        alignSelf: 'center',
                        borderRadius: dimensions.width * 0.1,
                        position: 'relative',
                        zIndex: 1
                    }}
                    resizeMode="stretch"
                />
                {stars.map((star) => (
                    <TouchableOpacity
                        key={star.id}
                        onPress={() => {
                            setSelectedStar(star);
                            setSelectedScreen('StarDetails');
                        }}
                        style={{
                            position: 'absolute',
                            top: star.top ? star.top : undefined,
                            left: star.left ? star.left : undefined,
                            right: star.right ? star.right : undefined,
                            bottom: star.bottom ? star.bottom : undefined,
                            zIndex: 500,
                        }}>
                        <Image
                            source={require('../assets/icons/starIcon.png')}
                            style={{
                                width: dimensions.height * 0.07,
                                height: dimensions.height * 0.07,
                                textAlign: 'center',

                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}

            </View>





        </SafeAreaView>
    );
};

export default MapScreen;
