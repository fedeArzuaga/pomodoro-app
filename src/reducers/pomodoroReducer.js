/*
{
    myPomodoros: {
        pomodoros: [
            {
                id: "jabfolwjebrfqes",
                minutes: 25,
                break: 5,
                rounds: 4
            },
            {
 c/               id: "jabfolwjebrfqes",
                minutes: 25,
                break: 5,
                rounds: 4
            }
        ],
        active: {
            {
                id: "jabfolwjebrfqes",
                minutes: 25,
                break: 5,
                rounds: 4
            }
        }
    }
}
*/

import { types } from "../types/types";

const initialState = {
    pomodoros: null,
    active: {}
}

export const pomodoroReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.pomodoroAddNew:
            return {
                ...state,
                pomodoros: [
                    ...state.pomodoros,
                    { ...action.payload }
                ]
            }
        
        case types.pomodoroGetCurrentData:
            return {
                ...state,
                pomodoros: [
                    ...action.payload
                ]
            }

        case types.pomodoroCleanPomodoroState:
            return {
                pomodoros: [],
                active: {}
            }

        case types.pomodoroSetActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.pomodoroDelete:
            return {
                pomodoros: state.pomodoros.filter( element => element.id !== action.payload ),
                ...state
            }

        case types.pomodoroToggleActiveIsRunning:
            return {
                ...state,
                active: {
                    ...state.active,
                    isRunning: action.payload
                }
            }
        
        default:
            return state;

    }
}