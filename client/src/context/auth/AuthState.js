import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

   // Register User

   // Login User

   // Logout

   // Clear Errors

   return (
      <AuthContext.Provider
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
