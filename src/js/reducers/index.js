import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { ADD_LISTING, SYNC_STATE, REMOVE_LISTING, GET_NAME_SUCCESS, GET_LISTINGS_SUCCESS, PUT_NAME_SUCCESS } from "../constants/action-types"


const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_LISTING:
      return { ...state, listings: [...state.listings, action.payload]};
    case REMOVE_LISTING:
      return { ...state, listings: state.listings.filter((listing)=>{ 
        return listing.id != action.payload.id;
      })};
    case GET_NAME_SUCCESS:
      console.log("GETNAME SUCCESS CALLED", action);
      return { ...state, ...{user: {name: action.payload.name, loggedIn: true} }};
    case PUT_NAME_SUCCESS:
      console.log("PUTNAME SUCCESS CALLED", action);
      return { ...state, ...{user: {name: action.payload.userInfo.name }}};
    case GET_LISTINGS_SUCCESS:
      return { ...state, listings: action.payload.listings };
    case SYNC_STATE:
      return action.payload;
    default:
      return state;
  }
}

export default  rootReducer
//
//combineReducers({
//  routing: routerReducer,
//  rootReducer
//})
