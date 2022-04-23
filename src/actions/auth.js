import { types } from "../types/types";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase/config";
import Swal from "sweetalert2";
import { cleanPomodoroState, setActive } from "./pomodoros";

export const login = ( uid, name, photoURL = '' ) => ({
    type: types.authLogin,
    payload: {
        uid: uid,
        name: name,
        photoURL: photoURL,
        isLoggedIn: true
    }
});

export const logout = () => ({
    type: types.authLogout
});

export const startLogout = () => {
    return ( dispatch ) => {

        const auth = getAuth();
        signOut(auth)
            .then(() => {
            
                dispatch(
                    logout()
                );

                dispatch(
                    cleanPomodoroState()
                );

            }).catch((error) => {
                console.log( error );
            });

    }
}

export const startLogin = ( email, password ) => {
    return ( dispatch ) => {
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                dispatch(
                    login( user.uid, user.displayName )
                )

                dispatch(
                    setActive({
                        minutes: "25",
                        breakTime: "5",
                        rounds: "4"
                    })
                );

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error( errorCode, errorMessage );
            });

    }
}

export const startRegistering = ( user ) => {
    return ( dispatch ) => {

        const auth = getAuth();

        const { name, email, password } = user;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const firebaseUser = userCredential.user;
            user.uid = firebaseUser.uid;

            return user;

        }).then( ( user ) => {

            updateProfile( auth.currentUser, {
                displayName: name
            })

            dispatch(
                login( user.uid, user.name )
            );

            dispatch(
                setActive({
                    minutes: "25",
                    breakTime: "5",
                    rounds: "4"
                })
            );

            Swal.fire({
                icon: 'success',
                title: 'The user has been created successfully',
                showConfirmButton: false,
                timer: 2000
            })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error( errorCode, errorMessage );
        });

    }
}

export const startLoginWithGoogle = () => {
    return ( dispatch ) => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup( auth, provider )
            .then( result => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                dispatch(
                    login( user.uid, user.displayName, user.photoURL )
                )

                dispatch(
                    setActive({
                        minutes: "25",
                        breakTime: "05",
                        rounds: "04"
                    })
                );

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });


    }
}