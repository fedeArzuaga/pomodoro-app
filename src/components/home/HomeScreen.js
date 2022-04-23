import React from 'react'
import { PomodoroScreen } from '../pomodoro/PomodoroScreen'

import { Sidebar } from './Sidebar'

export const HomeScreen = () => {
    return (
        <main
            className="home home__screen temp-d-flex"
        >

            <Sidebar />

            <PomodoroScreen />

        </main>
    )
}
