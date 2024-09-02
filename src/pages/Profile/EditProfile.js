// src/pages/Profile/EditProfile.js

import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phoneNumber: '',
    addresses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        if (data.code === 200) {
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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...profile.addresses];
    updatedAddresses[index] = value;
    setProfile({ ...profile, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    setProfile({ ...profile, addresses: [...profile.addresses, ''] });
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = profile.addresses.filter((_, i) => i !== index);
    setProfile({ ...profile, addresses: updatedAddresses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await profileService.updateProfile({
        name: profile.name,
        phoneNumber: profile.phone_number,
        addresses: profile.addresses,
      });
      if (result.code === 200) {
        navigate('/profile');
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Addresses</label>
          {profile.addresses.map((address, index) => (
            <div key={index} className="address-group">
              <input
                type="text"
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveAddress(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAddress}>
            Add Address
          </button>
        </div>
        <button type="submit" className="btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
