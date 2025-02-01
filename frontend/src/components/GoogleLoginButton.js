import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response);
    // Here, you can send the response.credential to your backend for verification
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
