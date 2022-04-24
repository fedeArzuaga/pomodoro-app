import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { types } from "../types/types";

export const startAddingPomodoro = ( pomodoro ) => {
    return async ( dispatch, getState ) => {

        const { auth } = getState();

        const docRef = await addDoc( collection( db, `${auth.uid}/user/my-pomodoros` ), pomodoro)
        console.log( "Saved", docRef.id );

        dispatch(
            addNewPomodoro( docRef.id, pomodoro )
        )

    }
}

export const startGettingCurrentData = ( uid ) => {
    return async ( dispatch ) => {

        const querySnapshot = await getDocs( collection( db, `${uid}/user/my-pomodoros` ) );

        let myPomodoros = [];
        
        querySnapshot.forEach( snapshot => {
            myPomodoros.push({
                id: snapshot.id,
                ...snapshot.data()
            }) 
        })

        dispatch(
            setCurrentPomodoros( myPomodoros )
        )

    }
}

export const startDeletingPomodoro = ( uid, id ) => {
    return ( dispatch ) => {

        Swal.fire({
            title: 'Are you sure you want to delete this pomodoro session?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__zoomIn animate__faster'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut animate__faster'
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then( async (result) => {

            if ( result.isConfirmed ) {

                await deleteDoc( doc( db, `${uid}/user/my-pomodoros/${id}` ) )

                dispatch(
                    startGettingCurrentData( uid )
                );

                Swal.fire(
                    'Deleted!',
                    'Your pomodoro session has been deleted.',
                    'success'
                );

            }

        })

    }
}

export const cleanPomodoroState = () => ({
    type: types.pomodoroCleanPomodoroState,
    payload: {
        pomodoros: [],
        active: {}
    }
})

export const setActive = ({ id = "", minutes, breakTime, rounds }) => ({
    type: types.pomodoroSetActive,
    payload: {
        id,
        minutes,
        breakTime,
        rounds,
        isRunning: false
    }
});

export const setCurrentPomodoros = ( pomodoros ) => ({
    type: types.pomodoroGetCurrentData,
    payload: [
        ...pomodoros
    ]
})

export const addNewPomodoro = ( id, pomodoro ) => ({
    type: types.pomodoroAddNew,
    payload: {
        id,
        ...pomodoro
    }
})

export const setIsRunningAction = ( bool ) => ({
    type: types.pomodoroSetActive,
    payload: bool
})