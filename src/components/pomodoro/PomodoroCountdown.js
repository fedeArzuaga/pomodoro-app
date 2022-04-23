import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { setActive, startAddingPomodoro } from '../../actions/pomodoros';
import { useCountdown } from '../../hooks/useCountdown';
import { useForm } from '../../hooks/useForm';

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
        minutesTimeState,
        secondsTime,
        breakTime,
        roundsGoalState,
        roundsDone,
        handlePlayCountdown,
        updateCountdown,
        isRunning,
        isOnSession
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
        
    }, [ active ])

    useEffect( () => {

        if ( roundsDone > roundsGoalState ) {
            setIsDone( true );
        }

    }, [ roundsDone ] )

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
                            className="pomodoro__form-label"
                        >
                            <input
                                className="pomodoro__form-input"
                                type="number"
                                id="minutes"
                                name="minutes"
                                maxLength={2}
                                minLength={2}
                                max={60}
                                min={10}
                                value={ isRunning ? minutesTimeState : minutesActive }
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
                                id="break"
                                name="break"
                                maxLength={2}
                                minLength={2}
                                max={60}
                                min={5}
                                value={ isRunning ? secondsTime : breakPomodoro }
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
                                        value={ rounds }
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
    
                    <button
                        className="pomodoro__button"
                        onClick={ handlePlayCountdown }
                    >
                        <i className="fa-solid fa-play"></i>
                    </button>
    
                    <button
                        className="pomodoro__button"
                        onClick={ handleAddFavorite }
                    >
                        <i className="fa-solid fa-star"></i>
                    </button>
    
                </div>
    
            </div>
        )
        : (
            <Navigate to="/congrats" />
        )
}
