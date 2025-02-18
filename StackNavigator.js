import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';
import { AudioProvider, useAudio } from './src/context/AudioContext';


const Stack = createNativeStackNavigator();

const MercurSpaceStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const [isOnboardWasVisible, setIsOnboardWasVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const [initializingMercurSpaceApp, setInitializingMercurSpaceApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadThisUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedUserHere = await AsyncStorage.getItem(storageKey);
        const isFuncOnbWasVisible = await AsyncStorage.getItem('isFuncOnbWasVisible');

        if (storedUserHere) {
          setUser(JSON.parse(storedUserHere));
          setIsOnboardWasVisible(false);
        } else if (isFuncOnbWasVisible) {
          setIsOnboardWasVisible(false);
        } else {
          setIsOnboardWasVisible(true);
          await AsyncStorage.setItem('isFuncOnbWasVisible', 'true');
        }
      } catch (error) {
        console.error('Error loading of cur user', error);
      } finally {
        setInitializingMercurSpaceApp(false);
      }
    };
    loadThisUser();
  }, [setUser]);

  if (initializingMercurSpaceApp) {
    return (
      <View style={{
        backgroundColor: '#012551',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="#0C6EE6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AudioProvider>
        <Stack.Navigator initialRouteName={isOnboardWasVisible ? 'OnboardingScreen' : 'Home'}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </AudioProvider>
    </NavigationContainer>
  );
};


export default MercurSpaceStack;
