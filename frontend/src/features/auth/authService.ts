import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const loginUser = async (dispatch: any, { username, password }: { username: string, password: string }) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
    const { token } = response.data;
    
    // Decode token to get role (simplified example)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    const role = payload.authorities[0].replace('ROLE_', '');
    
    dispatch(loginSuccess({ token, role }));
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    dispatch(loginFailure('Invalid credentials'));
    return false;
  }
};

export const registerUser = async ({ username, password }: { username: string, password: string }) => {
  try {
    await axios.post('http://localhost:8080/api/auth/register', { username, password });
    return true;
  } catch (error) {
    return false;
  }
};
