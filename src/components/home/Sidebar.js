import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { PomodoroCard } from '../pomodoro/PomodoroCard';
import { EmptySidebar } from './EmptySidebar';


export const Sidebar = () => {

    const { myPomodoros } = useSelector( state => state );

    const sidebarRef = useRef()

    const { pomodoros } = myPomodoros;

    const { active } = myPomodoros;

    const handleToggleSidebar = e => {
        
        if ( e.currentTarget.classList.contains('sidebar__open-icon--opened') ) {
            sidebarRef.current.classList.remove('sidebar--visible')
            e.currentTarget.classList.remove('sidebar__open-icon--opened')
        } else {
            sidebarRef.current.classList.add('sidebar--visible')
            e.currentTarget.classList.add('sidebar__open-icon--opened')
        }

    }

    return (
        <div
            className="sidebar temp-d-flex temp-df-columns"
            id="sidebar"
            ref={ sidebarRef }
        >

            <div
                className="temp-d-flex temp-df-middle temp-df-space-between temp-w-100 temp-mb-2 temp-pr-2"
            >
                <h1
                    className="temp-mb-0"
                >
                    My pomodoros
                </h1>
                <div
                    className="sidebar__open-icon pointer"
                    id="sidebar-open-icon"
                    onClick={ handleToggleSidebar }
                >
                    <i className="fa-solid fa-chevron-up"></i>
                </div>
            </div>

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
