import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setActive, startDeletingPomodoro } from '../../actions/pomodoros';

export const PomodoroCard = ({ id, minutes, breakTime, rounds }) => {

    const { auth, myPomodoros } = useSelector( state => state );
    const { active } = myPomodoros;
    const sidebar = document.querySelector("#sidebar");
    const sidebarIcon = document.querySelector("#sidebar-open-icon");

    const dispatch = useDispatch();

    const pomodoro = {
        id,
        minutes,
        breakTime,
        rounds
    }

    const handleSetActive = () => {

        if ( !active.isRunning ) {

            sidebar.classList.remove('sidebar--visible')
            sidebarIcon.classList.remove('sidebar__open-icon--opened')

            dispatch(
                setActive( pomodoro )
            );

        } else {
            Swal.fire({
                icon: 'error',
                title: 'You already have a session running',
                text: 'Try to stop your current session and then choose another pomodoro.'
            })
        }

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
                        { parseInt(minutes) < 10 ? `0${minutes}` : minutes }
                    </div>
                    <span>
                        Minutes
                    </span>
                </div>

                <div
                    className="sidebar__time-content"
                >
                    <div>
                        { parseInt(breakTime) < 10 ? `0${breakTime}` : breakTime }
                    </div>
                    <span>
                        Break
                    </span>
                </div>

                <div
                    className="sidebar__time-content"
                >
                    <div>
                        { parseInt(rounds) < 10 && rounds.length < 2 ? `0${rounds}` : rounds }
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
