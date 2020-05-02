import * as actionTypes from '../types';

export default (state, action) => {
   switch (action.type) {
      case actionTypes.GET_CONTACTS:
         return {
            ...state,
            contacts: action.payload,
            loading: false,
         };
      case actionTypes.ADD_CONTACT:
         return {
            ...state,
            contacts: [action.payload, ...state.contacts],
            loading: false,
         };
      case actionTypes.UPDATE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.map(contact =>
               contact._id === action.payload.id ? action.payload : contact
            ),
            loading: false,
         };
      case actionTypes.DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(
               contact => contact._id !== action.payload
            ),
            loading: false,
         };
      case actionTypes.CLEAR_CONTACTS:
         return {
            ...state,
            contacts: null,
            filtered: null,
            current: null,
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
      case actionTypes.FILTER_CONTACTS:
         return {
            ...state,
            filtered: state.contacts.filter(contact => {
               const regex = new RegExp(`${action.payload}`, 'gi');
               return contact.name.match(regex) || contact.email.match(regex);
            }),
            loading: false,
         };
      case actionTypes.CLEAR_FILTER:
         return {
            ...state,
            filtered: null,
         };
      case actionTypes.CONTACT_ERROR:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      default:
         return state;
   }
};
