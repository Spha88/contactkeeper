import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import * as actionTypes from '../types';

const AuthState = props => {
   // State
   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      user: null,
      error: null,
   };

   const [state, dispatch] = useReducer(authReducer, initialState);

   // Load User
   const loadUser = async () => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }

      try {
         const res = await axios.get('/api/auth');
         dispatch({ type: actionTypes.USER_LOADED, payload: res.data });
      } catch (err) {
         dispatch({ type: actionTypes.AUTH_ERROR });
      }
   };

   // Register User
   const register = async formData => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      try {
         // response to this will be a token
         const res = await axios.post('/api/users', formData, config); //proxy value set in package.json

         dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data, // token
         });

         loadUser();
      } catch (err) {
         dispatch({
            type: actionTypes.REGISTER_FAIL,
            payload: err.response.data.msg,
         });
      }
   };

   // Login User
   const login = () => console.log('Login');

   // Logout
   const logout = () => console.log('Logout');

   // Clear Errors
   const clearErrors = () => dispatch({ type: actionTypes.CLEAR_ERRORS });

   return (
      <AuthContext.Provider
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
