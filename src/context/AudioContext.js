import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(1.0); 

  useEffect(() => {
    const loadStoredVolume = async () => {
      try {
        const storedVolumeHere = await AsyncStorage.getItem('volume');
        if (storedVolumeHere !== null) {
          setVolume(parseFloat(storedVolumeHere));
        }
      } catch (error) {
        console.log('Error loading the volume:', error);
      }
    };
    loadStoredVolume();
  }, []);

  const handleChangeThisVolume = async (thisVolume) => {
    try {
      await AsyncStorage.setItem('volume', thisVolume.toString());
      setVolume(thisVolume);
    } catch (error) {
      console.log('Error saving volume:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ volume, setVolume: handleChangeThisVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
