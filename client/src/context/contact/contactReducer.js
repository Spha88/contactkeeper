import * as actionTypes from '../types';

export default (state, action) => {
   switch (action.type) {
      case actionTypes.ADD_CONTACT:
         return {
            ...state,
            contacts: [...state.contacts, action.payload],
         };

      case actionTypes.DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(
               contact => contact.id !== action.payload
            ),
         };
      default:
         return state;
   }
};
