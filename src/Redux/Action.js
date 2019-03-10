import { ENDPOINT } from "../Values";
import history from "../history"
    export const SIGN_IN_SUCCES = "SIGN_IN_SUCCES";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const SIGNING_IN = "SIGNING_IN";
export function SignIn(email,password){
    return function(dispatch) {
        dispatch(signingIn());
        fetch(`${ENDPOINT}Login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({email:email,password:password}),
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if(response.err) {
                dispatch(signingInError("Wrong password or username"));
            }else{
                dispatch(signInSucces());
            }
        }).catch(err => {dispatch(signingInError("Login error, please try again later."))});
    }
}
function signingIn(){
    return{
        type : SIGNING_IN,
    }
}
function signInSucces(){
    return{
        type : SIGN_IN_SUCCES,
    }
}
function signingInError(err){
    return{
        type : SIGN_IN_ERROR,
        signingIn : false,
        msg : err,
        error : true,
    }
}