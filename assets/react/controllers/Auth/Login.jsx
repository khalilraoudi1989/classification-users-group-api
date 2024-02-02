import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import performGoogleLogin from './handleGoogleLogin';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add any logic you want to execute when the component mounts
  }, []);

  const handleGoogleLoginClick = async (event) => {
    event.preventDefault(); // Prevent the default link behavior

    try {
      // Perform the Google login action
      const success = await performGoogleLogin();

      // If the login was successful, navigate to the specified route
      if (success) {
        navigate('/login-with-google');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>Please log in with your Google account:</p>
      <Link to="/login-with-google" onClick={handleGoogleLoginClick}>
        Login with Google
      </Link>
    </div>
  );
};

export default Login;
