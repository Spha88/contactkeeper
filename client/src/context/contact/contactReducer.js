import * as actionTypes from '../types';

export default (state, action) => {
   switch (action.type) {
      case actionTypes.ADD_CONTACT:
         return {
            ...state,
            contacts: [...state.contacts, action.payload],
         };
      case actionTypes.UPDATE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.map(contact =>
               contact.id === action.payload.id ? action.payload : contact
            ),
         };
      case actionTypes.DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(
               contact => contact.id !== action.payload
            ),
         };
      case actionTypes.SET_CURRENT:
         return {
            ...state,
            current: action.payload,
         };
      case actionTypes.CLEAR_CURRENT:
         return {
            ...state,
            current: null,
         };
      default:
         return state;
   }
};
