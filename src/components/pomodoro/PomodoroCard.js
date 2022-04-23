import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActive, startDeletingPomodoro } from '../../actions/pomodoros';

export const PomodoroCard = ({ id, minutes, breakTime, rounds }) => {

    const { auth } = useSelector( state => state );

    const dispatch = useDispatch();

    const pomodoro = {
        id,
        minutes,
        breakTime,
        rounds
    }

    const handleSetActive = () => {
        dispatch(
            setActive( pomodoro )
        );
    }

    const handleDeletePomodoro = () => {
        dispatch(
            startDeletingPomodoro( auth.uid, id )
        );
    }

    return (
        <div
            className="sidebar__pomodoro-card"
            onClick={ handleSetActive }
        >

            <div 
                className="sidebar__time-card temp-d-flex"
            >

                <div
                    className="sidebar__time-content"
                >
                    <div>
                        { minutes }
                    </div>
                    <span>
                        Minutes
                    </span>
                </div>

                <div
                    className="sidebar__time-content"
                >
                    <div>
                        { breakTime }
                    </div>
                    <span>
                        Break
                    </span>
                </div>

                <div
                    className="sidebar__time-content"
                >
                    <div>
                        { rounds }
                    </div>
                    <span>
                        Round
                    </span>
                </div>

                <div
                    className="sidebar__trash-icon"
                    onClick={ handleDeletePomodoro }
                >
                    <span className="sidebar__trash">
                        <i className="fa-solid fa-trash-can"></i>
                    </span>
                </div>

            </div>

        </div>
    )
}