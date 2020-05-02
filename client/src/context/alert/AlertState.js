import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import * as actionTypes from '../types';

const AlertState = props => {
   // State
   const initialState = [];

   const [state, dispatch] = useReducer(alertReducer, initialState);

   // Set Alert
   const setAlert = (msg, type, timeout = 5000) => {
      const id = uuidv4();
      dispatch({
         type: actionTypes.SET_ALERT,
         payload: { msg, type, id },
      });

      setTimeout(() => {
         dispatch({ type: actionTypes.REMOVE_ALERT, payload: id });
      }, timeout);
   };

   return (
      <AlertContext.Provider
         value={{
            alerts: state,
            setAlert,
         }}
      >
         {props.children}
      </AlertContext.Provider>
   );
};

export default AlertState;
