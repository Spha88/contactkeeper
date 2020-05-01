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

   // Update contact

   // Filter contacts

   // Clear Filter

   return (
      <ContactContext.Provider
         value={{
            contacts: state.contacts,
            addContact,
            deleteContact,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
