import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as actionTypes from '../types';

const ContactState = props => {
   // State
   const initialState = {
      contacts: [],
      current: null,
      filtered: null,
      error: null,
   };

   const [state, dispatch] = useReducer(contactReducer, initialState);

   //Load Contacts
   const loadContacts = async () => {
      try {
         const res = await axios.get('/api/contacts');
      } catch (err) {
         console.log(err);
      }
   };

   // Add contact
   const addContact = async contact => {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      try {
         const res = await axios.post('/api/contacts', contact, config);

         dispatch({ type: actionTypes.ADD_CONTACT, payload: res.data });
      } catch (err) {
         dispatch({
            type: actionTypes.CONTACT_ERROR,
            payload: err.response.msg,
         });
      }
   };

   // Delete contact
   const deleteContact = id => {
      dispatch({ type: actionTypes.DELETE_CONTACT, payload: id });
   };

   // Set current contact
   const setCurrent = contact => {
      dispatch({ type: actionTypes.SET_CURRENT, payload: contact });
   };

   // Clear Current Contact
   const clearCurrent = () => {
      dispatch({ type: actionTypes.CLEAR_CURRENT });
   };

   // Update contact
   const updateContact = contact => {
      dispatch({ type: actionTypes.UPDATE_CONTACT, payload: contact });
   };

   // Filter contacts
   const filterContacts = text => {
      dispatch({ type: actionTypes.FILTER_CONTACTS, payload: text });
   };

   // Clear Filter
   const clearFilter = () => {
      dispatch({ type: actionTypes.CLEAR_FILTER });
   };

   return (
      <ContactContext.Provider
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loadContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
