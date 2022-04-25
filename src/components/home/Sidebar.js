import React from 'react'
import { useSelector } from 'react-redux';
import { PomodoroCard } from '../pomodoro/PomodoroCard';
import { EmptySidebar } from './EmptySidebar';


export const Sidebar = () => {

    const { myPomodoros } = useSelector( state => state );

    const { pomodoros } = myPomodoros;

    return (
        <div
            className="sidebar temp-d-flex temp-df-columns"
            id="sidebar"
        >

            <h1>My pomodoros</h1>

            <div
                className="sidebar__container"
            >
                {
                    ( pomodoros ) 
                        ?
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
                        :
                        <div className="temp-d-flex temp-df-columns temp-df-center temp-df-middle temp-ph-100">
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                }
            </div>

        </div>
    )
}
