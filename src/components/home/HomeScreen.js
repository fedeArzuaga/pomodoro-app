import React, { useEffect } from 'react'
import { PomodoroScreen } from '../pomodoro/PomodoroScreen'

import { Sidebar } from './Sidebar'

export const HomeScreen = () => {
    
    useEffect( () => {

        if ( Notification.permission === "default" ) {
            Notification.requestPermission();
        }

    }, [])

    return (
        <main
            className="home home__screen temp-d-flex"
        >

            <Sidebar />

            <PomodoroScreen />

        </main>
    )
}
