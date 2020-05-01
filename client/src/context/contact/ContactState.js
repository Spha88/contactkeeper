import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import * as actionTypes from '../types';

const ContactState = props => {
   // State
   const initialState = {
      contacts: [
         {
            type: 'professional',
            id: 1,
            name: 'Sara Smith',
            email: 'ssmith@gmail.com',
            phone: '0781160376',
         },
         {
            type: '',
            id: 2,
            name: 'Zizo Beda',
            email: 'spha@gmail.com',
            phone: '0781163676',
         },
         {
            type: 'personal',
            id: 3,
            name: 'Zanele Mehlomakulu',
            email: 'spha@gmail.com',
            phone: '0781163676',
         },
      ],
      current: null,
      filtered: null,
   };

   const [state, dispatch] = useReducer(contactReducer, initialState);

   // Add contact
   const addContact = contact => {
      contact.id = uuidv4();
      dispatch({ type: actionTypes.ADD_CONTACT, payload: contact });
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
