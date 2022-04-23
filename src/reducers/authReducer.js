
/*
auth: {
    uid: "sjdbgkahjsdbf",
    name: "Federico",
    isLoggedIn: true
}
*/

import { types } from "../types/types";


export const authReducer = ( state = { isLoggedIn: false }, action ) => {
  
    switch ( action.type ) {

        case types.authLogout:
            return {
                isLoggedIn: false
            }
        
        case types.authLogin:
            return {
                uid: action.payload.uid,
                name: action.payload.name,
                photoURL: action.payload.photoURL,
                isLoggedIn: true
            }

        default:
            return state;

    }

}
