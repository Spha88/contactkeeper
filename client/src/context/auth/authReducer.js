import * as actionTypes from '../types';

export default (state, action) => {
   switch (action.type) {
      case actionTypes.USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload,
         };
      case actionTypes.LOGIN_SUCCESS:
      case actionTypes.REGISTER_SUCCESS:
         localStorage.setItem('token', action.payload.token);
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false,
         };
      case actionTypes.REGISTER_FAIL:
      case actionTypes.AUTH_ERROR:
      case actionTypes.LOGIN_FAIL:
      case actionTypes.LOGOUT:
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload,
         };
      case actionTypes.LOGOUT:
      case actionTypes.CLEAR_ERRORS:
         return {
            ...state,
            error: null,
         };

      default:
         return state;
   }
};
