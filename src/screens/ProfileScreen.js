import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
    TextInput,
    SafeAreaView,
    Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon, CheckIcon, PlusIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'react-native-image-picker';
import { set } from 'date-fns';


const fontSfProTextRegular = 'SFProText-Regular';


const settingsButtons = [
    {
        id: 1,
        title: 'Privacy Policy',
        link: 'https://www.termsfeed.com/live/c63630d4-33a2-46c2-bf09-20399e05cf0b',
    },
    {
        id: 2,
        title: 'Terms of Use',
        link: 'https://www.termsfeed.com/live/fa59417e-ab9e-4c77-bad9-26750c9b8240',
    }
]

const ProfileScreen = ({ setThisSelectedScreen, routes, thisSelectedScreen }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [isThisProfileEditingNow, setIsThisProfileEditingNow] = useState(false);
    const [surname, setSurname] = useState('');


    const [storagedName, setStoragedName] = useState('');
    const [storagedSurname, setStoragedSurname] = useState('');
    const [storagedImage, setStoragedImage] = useState(null);
    const [storagedEmail, setStoragedEmail] = useState('');


    useEffect(() => {
        const loadUserProfileData = async () => {
            try {
                const userProfile = await AsyncStorage.getItem('UserProfile');
                if (userProfile !== null) {
                    const { name, surname, email, image } = JSON.parse(userProfile);
                    setStoragedName(name);
                    setStoragedSurname(surname);
                    setStoragedEmail(email);
                    setStoragedImage(image);
                }
            } catch (error) {
                console.error('Error loading user profile:', error);
            }
        };

        loadUserProfileData();
    }, [isThisProfileEditingNow, thisSelectedScreen]);


    const handleImagePicker = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelle image picker');
            } else if (response.error) {
                console.log('Image Pick Error: ', response.error);
            } else {
                setImage(response.assets[0].uri);
            }
        });
    };

    const handleSave = async () => {
        if (email && !email.includes('@')) {
            Alert.alert('Invalid email', 'Email must contain @ symbol');
            return;
        }

        try {
            const existingProfile = await AsyncStorage.getItem('UserProfile');
            const userProfile = existingProfile ? JSON.parse(existingProfile) : {};

            if (name) userProfile.name = name;
            if (surname) userProfile.surname = surname;
            if (email) userProfile.email = email;
            if (image) userProfile.image = image;

            await AsyncStorage.setItem('UserProfile', JSON.stringify(userProfile));
            setIsThisProfileEditingNow(false);
            setName('');
            setSurname('');
            setEmail('');
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };




    const handleDeleteImage = () => {
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete this image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setImage(null); 
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={{
            width: dimensions.width,
            flex: 1,
            zIndex: 1,
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            justifyContent: 'flex-start',
        }} >
            {!isThisProfileEditingNow ? (
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    position: 'relative',
                    zIndex: 1,

                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsThisProfileEditingNow(true);
                        }}
                        style={{
                            position: 'absolute',
                            top: dimensions.height * 0.12,
                            right: dimensions.width * 0.05,
                            zIndex: 500,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            padding: dimensions.width * 0.05,
                            borderRadius: dimensions.width * 0.5,
                        }}>
                        <Image
                            source={require('../assets/icons/editIcon.png')}
                            style={{
                                width: dimensions.height * 0.037,
                                height: dimensions.height * 0.037,

                                textAlign: 'center'
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        padding: dimensions.width * 0.02,
                        backgroundColor: '#0C6EE6',
                        borderRadius: dimensions.width * 0.05,
                        paddingHorizontal: dimensions.width * 0.05,
                        paddingBottom: dimensions.height * 0.03,
                    }}>
                        <Text style={{
                            fontFamily: fontSfProTextRegular,
                            color: 'white',
                            fontSize: dimensions.width * 0.05,
                            textAlign: 'center',
                            fontWeight: 600,
                            marginTop: dimensions.height * 0.08,
                        }}
                        >
                            Profile
                        </Text>
                        <Image
                            source={storagedImage
                                ? { uri: storagedImage }
                                : require('../assets/images/noImage.png')}
                            style={{
                                width: dimensions.height * 0.19,
                                height: dimensions.height * 0.19,
                                textAlign: 'center',
                                alignSelf: 'center',
                                borderRadius: dimensions.width * 0.5,
                                marginTop: dimensions.height * 0.025,
                            }}
                            resizeMode="stretch"
                        />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: '100%',
                        }}>
                            <Text
                                style={{
                                    fontFamily: fontSfProTextRegular,
                                    fontSize: dimensions.width * 0.062,
                                    fontWeight: 600,
                                    color: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    paddingHorizontal: dimensions.width * 0.005,
                                    textAlign: 'center',
                                }}>
                                {storagedName ? storagedName : 'Name'}
                            </Text>
                            <Text
                                style={{
                                    justifyContent: 'center',
                                    fontFamily: fontSfProTextRegular,
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    alignItems: 'center',
                                    fontSize: dimensions.width * 0.062,
                                    fontWeight: 'bold',
                                    paddingHorizontal: dimensions.width * 0.005,
                                }}>
                                {storagedSurname ? storagedSurname : 'Surname'}
                            </Text>

                        </View>
                        <Text
                            style={{
                                fontSize: dimensions.width * 0.037,
                                fontFamily: fontSfProTextRegular,
                                color: 'white',
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontWeight: 600,
                                opacity: 0.6,

                                paddingHorizontal: 21,
                            }}>
                            {storagedEmail ? storagedEmail : 'yourEmail@gmail.com'}
                        </Text>
                    </View>

                    {settingsButtons.map((button) => (

                        <TouchableOpacity
                            key={button.id}
                            onPress={() => {
                                Linking.openURL(button.link);
                            }}
                            style={{
                                backgroundColor: '#003F8C',
                                borderRadius: dimensions.width * 0.4,
                                paddingVertical: dimensions.height * 0.028,
                                marginTop: dimensions.height * 0.008,
                                alignSelf: 'center',
                                width: '95%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: dimensions.width * 0.05,
                            }}
                        >
                            <Text
                                style={{ fontFamily: fontSfProTextRegular, color: 'white', fontSize: dimensions.width * 0.04, textAlign: 'center', fontWeight: 700 }}>
                                {button.title}
                            </Text>
                            <ChevronRightIcon size={dimensions.width * 0.05} color='#0C6EE6' />
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '100%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        padding: dimensions.width * 0.02,
                        backgroundColor: '#0C6EE6',
                        borderRadius: dimensions.width * 0.05,
                        paddingHorizontal: dimensions.width * 0.05,
                        paddingBottom: dimensions.height * 0.03,
                    }}>

                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: dimensions.height * 0.08,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsThisProfileEditingNow(false);
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                <ChevronLeftIcon size={dimensions.height * 0.03} color='white' />
                                <Text
                                    style={{
                                        fontSize: dimensions.width * 0.04,
                                        fontFamily: fontSfProTextRegular,
                                        color: 'white',
                                        textAlign: 'left',
                                        alignSelf: 'flex-start',
                                        fontWeight: 400,

                                        paddingHorizontal: dimensions.width * 0.01,

                                        marginTop: dimensions.height * 0.003,
                                    }}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: dimensions.width * 0.043,
                                    fontFamily: fontSfProTextRegular,
                                    color: 'white',
                                    textAlign: 'left',
                                    alignSelf: 'flex-start',
                                    fontWeight: 600,

                                    paddingRight: dimensions.width * 0.05,

                                    marginTop: dimensions.height * 0.003,
                                }}>
                                Edit Profile
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    handleSave()
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: dimensions.width * 0.04,
                                        fontFamily: fontSfProTextRegular,
                                        color: 'white',
                                        textAlign: 'left',
                                        alignSelf: 'flex-start',
                                        fontWeight: 400,

                                        paddingHorizontal: dimensions.width * 0.01,
                                        opacity: !name && !surname && !email ? 0.5 : 1,
                                        marginTop: dimensions.height * 0.003,
                                    }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {!image ? (

                            <TouchableOpacity
                                onPress={handleImagePicker}
                                style={{
                                    alignItems: 'center',
                                    marginBottom: dimensions.height * 0.01,
                                    alignSelf: 'center',
                                    backgroundColor: '#001250',
                                    borderRadius: dimensions.width * 0.5,
                                    padding: dimensions.height * 0.064,
                                    marginTop: dimensions.height * 0.035,

                                }}>
                                <Image
                                    source={require('../assets/images/cameraImage.png')}
                                    style={{
                                        width: dimensions.height * 0.064,
                                        height: dimensions.height * 0.064,
                                        textAlign: 'center',
                                        alignSelf: 'center',

                                    }}
                                    resizeMode="stretch"
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={handleDeleteImage}
                                style={{
                                    marginTop: dimensions.height * 0.001,
                                }}>

                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: dimensions.height * 0.19,
                                        height: dimensions.height * 0.19,
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        borderRadius: dimensions.width * 0.5,
                                        marginTop: dimensions.height * 0.005,
                                    }}
                                    resizeMode="stretch"
                                />
                            </TouchableOpacity>

                        )}
                    </View>

                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#8f8f8f"
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'left',
                            padding: dimensions.width * 0.035,
                            paddingVertical: dimensions.height * 0.028,
                            backgroundColor: '#003F8C',
                            borderRadius: dimensions.width * 0.5,
                            width: '95%',
                            marginBottom: dimensions.height * 0.005,
                            color: 'white',
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.046,
                            fontWeight: 600,
                            textAlign: 'left',
                            marginTop: dimensions.height * 0.03,
                            paddingHorizontal: dimensions.width * 0.055,
                        }}
                    />

                    <TextInput
                        placeholder="Surname"
                        value={surname}
                        onChangeText={setSurname}
                        placeholderTextColor="#8f8f8f"
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'left',
                            padding: dimensions.width * 0.035,
                            paddingVertical: dimensions.height * 0.028,
                            backgroundColor: '#003F8C',
                            borderRadius: dimensions.width * 0.5,
                            width: '95%',
                            marginBottom: dimensions.height * 0.005,
                            color: 'white',
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.046,
                            fontWeight: 600,
                            textAlign: 'left',
                            marginTop: dimensions.height * 0.005,
                            paddingHorizontal: dimensions.width * 0.055,
                        }}
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#8f8f8f"
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'left',
                            padding: dimensions.width * 0.035,
                            paddingVertical: dimensions.height * 0.028,
                            backgroundColor: '#003F8C',
                            borderRadius: dimensions.width * 0.5,
                            width: '95%',
                            marginBottom: dimensions.height * 0.005,
                            color: 'white',
                            fontFamily: fontSfProTextRegular,
                            fontSize: dimensions.width * 0.046,
                            fontWeight: 600,
                            textAlign: 'left',
                            marginTop: dimensions.height * 0.005,
                            paddingHorizontal: dimensions.width * 0.055,
                        }}
                    />

                </View>
            )}



        </View>
    );
};

export default ProfileScreen;
