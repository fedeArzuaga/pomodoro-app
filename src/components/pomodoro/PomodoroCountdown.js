import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { setToggleActiveIsRunning, startAddingPomodoro } from '../../actions/pomodoros';
import { useCountdown } from '../../hooks/useCountdown';
import { useForm } from '../../hooks/useForm';

const body = document.body;

export const PomodoroCountdown = () => {

    const dispatch = useDispatch();

    const { myPomodoros } = useSelector( state => state );
    const [isDone, setIsDone] = useState( false );

    const { active } = myPomodoros;

    const [ values, setValues, handleInputChange] = useForm({
        minutes: active.minutes,
        break: active.breakTime,
        rounds: active.rounds
    })

    const [
        isOnPause,
        minutesTimeState,
        secondsTime,
        breakTime,
        roundsGoalState,
        roundsDone,
        handlePlayCountdown,
        updateCountdown,
        isRunning,
        setIsRunning,
        isOnSession,
        handlePauseCountdown,
        handleStopCountdown
    ] = useCountdown({
        minutesTime: active.minutes,
        breakTime: active.breakTime,
        roundsGoal: active.rounds
    })

    const { minutes: minutesActive, break: breakPomodoro, rounds } = values;

    useEffect( () => {

        setValues({
            minutes: active.minutes,
            break: active.breakTime,
            rounds: active.rounds
        });

        updateCountdown( active.minutes, active.breakTime, active.rounds )
        
    }, [ active.minutes, active.breakTime, active.rounds ])

    useEffect( () => {

        if ( roundsDone > roundsGoalState ) {
            setIsRunning( false )
            setIsDone( true );
        }

    }, [ roundsDone ] )

    useEffect( () => {

        if ( isRunning && isOnSession ) {
            body.classList.remove('temp-break-time');
            body.classList.add('temp-session-time');
        } else if ( isRunning && !isOnSession ) {
            body.classList.remove('temp-session-time');
            body.classList.add('temp-break-time');
        } else {
            body.classList.remove('temp-break-time');
            body.classList.remove('temp-session-time');
        }

    }, [ isOnSession, isRunning ])

    const handleAddFavorite = ( e ) => {
        e.preventDefault();
        dispatch(
            startAddingPomodoro( values )
        )
    }

    return !isDone
        ? (
            <div
                className="pomodoro pomodoro__screen temp-container-expand"
            >
                
                <h1
                    className="temp-fw-400"
                >
                    { isRunning ? (isOnSession ? `Session running (${roundsDone}/${roundsGoalState})`: "Break time") : "Configure your session" }
                </h1>
    
                <form
                    className="pomodoro__form"
                >
    
                    <div
                        className="temp-d-flex temp-df-center temp-df-middle"
                    >
    
                        <label
                            className={ !isRunning ? "pomodoro__form-label" : "pomodoro__form-label pomodoro__form-label--active" }
                        >
                            <input
                                className="pomodoro__form-input"
                                type="number"
                                id="minutes"
                                name="minutes"
                                maxLength={2}
                                minLength={2}
                                max={60}
                                min={1}
                                value={ isRunning 
                                    ? minutesTimeState < 10 ? "0" + minutesTimeState : minutesTimeState
                                    : minutesActive < 10 ? "0" + minutesActive : minutesActive }
                                onChange={ handleInputChange }
                            />
                            <div>
                                Minutes
                            </div>
                        </label>
    
                        <label
                            className="pomodoro__form-label"
                        >
                            <input
                                className="pomodoro__form-input"
                                type="number"
                                id="breakTime"
                                name="breakTime"
                                maxLength={2}
                                minLength={2}
                                max={60}
                                min={1}
                                value={ isRunning 
                                    ? secondsTime < 10 ? "0" + secondsTime : secondsTime
                                    : breakPomodoro < 10 ? "0" + breakPomodoro : breakPomodoro }
                                onChange={ handleInputChange }
                            />
                            <div>
                                { isRunning ? "Seconds" : "Break" }
                            </div>
                        </label>
    
                        {
                            !isRunning && (
                                <label
                                    className="pomodoro__form-label"
                                >
                                    <input
                                        className="pomodoro__form-input"
                                        type="number"
                                        id="rounds"
                                        name="rounds"
                                        maxLength={2}
                                        minLength={2}
                                        max={10}
                                        min={1}
                                        value={ rounds < 10 ? "0" + rounds : rounds }
                                        onChange={ handleInputChange }
                                    />
                                    <div>
                                        { rounds > 1 ? "Rounds" : "Round" }
                                    </div>
                                </label>
                            )
                        }
    
                    </div>
    
                </form>
    
                <div
                    className="temp-d-flex temp-df-center temp-df-middle temp-mt-4"
                >
                    
                    {
                        isOnPause
                            ? (
                                <>
                                    <button
                                        className="pomodoro__button"
                                        onClick={ () => {
                                            handlePlayCountdown();
                                            dispatch(
                                                setToggleActiveIsRunning( true )
                                            )
                                        }}
                                    >
                                        <i className="fa-solid fa-play"></i>
                                    </button>
                    
                                    <button
                                        className="pomodoro__button"
                                        onClick={ handleAddFavorite }
                                    >
                                        <i className="fa-solid fa-star"></i>
                                    </button>
                                </>
                            )
                            : (
                                <>
                                    <button
                                        className="pomodoro__button"
                                        onClick={ () => {
                                            handlePauseCountdown();
                                            dispatch(
                                                setToggleActiveIsRunning( false )
                                            )
                                        }}
                                    >
                                        <i className="fa-solid fa-pause"></i>
                                    </button>
                    
                                    <button
                                        className="pomodoro__button"
                                        onClick={ () => {
                                            handleStopCountdown();
                                            dispatch(
                                                setToggleActiveIsRunning( false )
                                            )
                                        }}
                                    >
                                        <i className="fa-solid fa-stop"></i>
                                    </button>
                                </>
                            )
                    }
    
                </div>
    
            </div>
        )
        : (
            <Navigate to="/congrats" />
        )
}
