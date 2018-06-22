import { ADD_LISTING, SYNC_STATE, REMOVE_LISTING, GET_NAME, GET_NAME_SUCCESS, GET_LISTINGS_SUCCESS, PUT_NAME_SUCCESS } from '../constants/action-types';

export const addListing = listing => ({ type: ADD_LISTING, payload: listing});

export const removeListing = key => ({ type: REMOVE_LISTING, payload: key});


export const syncState =  state => ({ type: SYNC_STATE, payload: state});

export const getNameSuccess = (name) => ({ type: GET_NAME_SUCCESS, payload: name })
export const putNameSuccess = (name) => ({ type: PUT_NAME_SUCCESS, payload: name })

export const getListingsSuccess = (listings) => ({ type: GET_LISTINGS_SUCCESS, payload: listings })

export const addListingsSuccess = (listings) => ({ type: ADD_LISTINGS_SUCCESS, payload: userInfo })


export function getName() {
  console.log("getName1");
  return function(dispatch){
    return fetch('http://localhost:3000/profile', {
      credentials: 'same-origin'
    })
     .then(
       response => response.json(),
       error => console.log('ERROR', error),
     ).then(json =>
       dispatch(getNameSuccess(json))
     )
  }
} 

export function updateName(userInfo) {
  return function(dispatch){
    return fetch('http://localhost:3000/profile', {
      method: 'PUT',
      body: JSON.stringify( userInfo ),
      credentials: 'same-origin'
    })
     .then(
       response => response.json(),
       error => console.log('ERROR', error),
     ).then(json =>
       dispatch(putNameSuccess(json))
     )
  }
} 

export function getListingsAsync(listing) {
  console.log("get listings async invoked");
  return function(dispatch){
    return fetch('/listings', {
    credentials: 'same-origin',
    method: 'GET', 
    headers: new Headers({
          'Content-Type': 'application/json'
        })
    }).then(
      res => res.json()
    ).then(json =>
       dispatch(getListingsSuccess(json))
    )
  }
}

export function addListingAsync(listing) {
  console.log("getName1", listing);
  return function(dispatch){
    return fetch('/listings', {
    credentials: 'same-origin',
    method: 'POST', 
    body: JSON.stringify(listing), // data can be `string` or {object}!
    headers: new Headers({
          'Content-Type': 'application/json'
        })
    }).then(
      res => res.json()
    ).then(json =>
       dispatch(addListingsSuccess(json))
    )
  }
}
