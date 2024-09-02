// src/context/ProfileContext.js

import React, { createContext, useState, useEffect } from 'react';
import profileService from '../services/profileService';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const userProfile = await profileService.getProfile();
      setProfile(userProfile);
    };
    loadProfile();
  }, []);

  const updateProfile = async (updatedProfile) => {
    const newProfile = await profileService.updateProfile(updatedProfile);
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
