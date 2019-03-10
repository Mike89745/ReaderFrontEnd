import {
   SIGNING_IN,
   SIGN_IN_SUCCES,
   SIGN_IN_ERROR
} from "./Action";
/**
 * xdd 
 */
export const UserReducer = (state = {},action) =>{
    switch (action.type) {
        case SIGNING_IN:
            return Object.assign({}, state, {
                signingIn : true,
                signedIn: false,
                error : false,
                msg : null,
            })
        case SIGN_IN_SUCCES:
            return Object.assign({}, state, {
                signingIn : false,
                signedIn : true,
                error : false,
                token : action.token
            })
        case SIGN_IN_ERROR:
            return Object.assign({}, state, {
                signingIn : false,
                user : null,
                error : action.error,
                msg : action.msg,
            })
        default:
            return state
    }
}
