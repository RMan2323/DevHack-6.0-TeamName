import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  // Add to onSuccess handler
  const onSuccess = async (response) => {
  try {
    const res = await axiosInstance.post('/api/auth/google', {
      token: response.credential
    });
    localStorage.setItem('token', res.data.token);
    // Update AuthContext state
  } catch (err) {
    console.error('Auth failed:', err);
  }
};


  const onFailure = (response) => {
    console.error('Login Failed: res:', response);
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onFailure={onFailure}
      logo="Google"
      style={{ width: '100%' }}
    />
  );
};

export default GoogleLoginButton;
