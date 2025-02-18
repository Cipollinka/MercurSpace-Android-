import AsyncStorage from '@react-native-async-storage/async-storage';
import { id } from 'date-fns/locale';
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

const fontSfProTextRegular = 'SFProText-Regular';

const constellations = [
    {
        id: 1,
        title: 'ORION',
        image: require('../assets/images/constellations/orion.png'),
    },
    {
        id: 2,
        title: 'CYGNUS',
        image: require('../assets/images/constellations/cygnus.png'),
    },
    {
        id: 3,
        title: 'LYRAE',
        image: require('../assets/images/constellations/lyrae.png'),
    },
    {
        id: 4,
        title: 'CASSI',
        image: require('../assets/images/constellations/cassi.png'),
    },
    {
        id: 5,
        title: 'SCORP',
        image: require('../assets/images/constellations/scorp.png'),
    }
]

const GameScreen = ({ setSelectedScreen, selectedScreen, currentConstellation, setCurrentConstellation, currentConstellationId, setCurrentConstellationId }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [inputValues, setInputValues] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (currentConstellation) {
            setInputValues(Array(currentConstellation.title.length).fill(''));
        }
    }, [currentConstellation]);

    const handleInputChange = (text, index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = text;
        setInputValues(newInputValues);

        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const enteredWord = newInputValues.join('');
        if (enteredWord.length === currentConstellation.title.length) {
            if (enteredWord === currentConstellation.title) {
                setIsCorrect(true);
            } else {
                Alert.alert('Incorrect', 'The entered word is incorrect. Please try again.');
                setInputValues(Array(currentConstellation.title.length).fill(''));
                inputRefs.current[0]?.focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !inputValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if (selectedScreen) {
            if (currentConstellationId < constellations.length - 1) {
                setCurrentConstellationId((prev) => prev + 1);
            } else {
                setCurrentConstellationId(0);
            }
            setCurrentConstellation(constellations[currentConstellationId]);
        }
    }, [selectedScreen]);

    if (!currentConstellation) {
        return null; 
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{
                width: dimensions.width,
                alignItems: 'center',
            }}>
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
                        onPress={() => setSelectedScreen('Profile')}
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
                </View>
                {!isCorrect ? (
                    <>
                        {currentConstellation && (
                            <View style={{
                                alignSelf: 'center',
                                width: dimensions.width,
                            }}>
                                <Image
                                    source={currentConstellation.image}
                                    style={{
                                        width: dimensions.width,
                                        height: dimensions.height * 0.4,
                                        resizeMode: 'stretch',
                                        alignSelf: 'center',
                                    }}
                                />
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 800,
                                    fontSize: dimensions.width * 0.059,
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    marginTop: dimensions.height * 0.02,
                                    textAlign: 'center',
                                }}>
                                    What constellation is this?
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    alignSelf: 'center',
                                    marginTop: dimensions.height * 0.03,
                                    paddingHorizontal: dimensions.width * 0.05,
                                }}>
                                    {currentConstellation.title.split('').map((char, index) => (
                                        <View key={index} style={{
                                            width: dimensions.width * 0.14,
                                            paddingVertical: dimensions.height * 0.03,
                                            backgroundColor: '#023778',
                                            borderRadius: dimensions.width * 0.05,
                                            opacity: 1,
                                        }}>
                                            <TextInput
                                                ref={el => inputRefs.current[index] = el}
                                                style={{
                                                    fontFamily: 'fontSfProTextRegular',
                                                    color: 'white',
                                                    fontWeight: '800',
                                                    fontSize: dimensions.width * 0.059,
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    textAlign: 'center',
                                                }}
                                                maxLength={1}
                                                value={inputValues[index]}
                                                onChangeText={(text) => handleInputChange(text, index)}
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                            />
                                            <View style={{
                                                width: '50%',
                                                alignSelf: 'center',
                                                backgroundColor: 'white',
                                                height: dimensions.height * 0.0014,
                                                position: 'absolute',
                                                bottom: '59%',
                                            }} />
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    <View>
                        <Text style={{
                            color: 'white',
                            fontWeight: 800,
                            fontSize: dimensions.width * 0.07,
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.02,
                            textAlign: 'center',
                            marginTop: dimensions.height * 0.28,
                        }}>
                            Test passed successfully!
                        </Text>


                        <Image
                            source={require('../assets/images/resultImage.png')}
                            style={{
                                width: dimensions.height * 0.25,
                                height: dimensions.height * 0.25,
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                marginTop: dimensions.height * 0.02,
                            }}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default GameScreen;
