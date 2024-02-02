import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PerformGoogleLogin = () => {
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/oauth/connect/google`);

        // Navigate to the Google login route only if the API call was successful
        if (response.status === 200) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    };

    fetchData();  // Call the fetchData function immediately

    // Add any additional logic you want to execute when the component mounts
  }, [history]);  // Make sure to include navigate in the dependencies array

  return null;  // This component doesn't render anything, so you can return null
};

export default PerformGoogleLogin;
