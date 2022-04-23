import React from 'react'
import { useSelector } from 'react-redux';
import { PomodoroCard } from '../pomodoro/PomodoroCard';
import { EmptySidebar } from './EmptySidebar';


export const Sidebar = () => {

    const { myPomodoros } = useSelector( state => state );

    const { pomodoros } = myPomodoros;

    const exampleArr = [];

    return (
        <div
            className="sidebar temp-d-flex temp-df-columns"
        >

            <h1>My pomodoros</h1>

            <div
                className="sidebar__container"
            >
                {
                    pomodoros.length > 0 
                        ? (
                            pomodoros.map( element => {
                                return (
                                    <PomodoroCard
                                        key={ element.id }
                                        id={ element.id }
                                        minutes={ element.minutes }
                                        breakTime={ element.break }
                                        rounds={ element.rounds }
                                    />
                                )
                            })
                        )
                        : (
                            <EmptySidebar />
                        )
                }
            </div>

        </div>
    )
}
