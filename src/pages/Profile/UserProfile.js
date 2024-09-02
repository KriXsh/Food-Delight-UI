// src/pages/Profile/UserProfile.js

import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import '../../styles/components.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        if (data.code === 200) {
          // Parse the addresses string back into an array
          const parsedAddresses = JSON.parse(data.result.addresses || '[]');
          setProfile({ ...data.result, addresses: parsedAddresses });
        } else {
          setError('Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone Number:</strong> {profile.phone_number}</p>
      <p><strong>Addresses:</strong> {profile.addresses.join(', ')}</p> {/* Join addresses */}
      <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
