import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadHereUser = async () => {
      try {
        const storedHereUser = await AsyncStorage.getItem('currentUser');
        if (storedHereUser) {
          setUser(JSON.parse(storedHereUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadHereUser();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
