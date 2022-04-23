import React from 'react'
import { Navbar } from './../navbar/Navbar'
import { PomodoroCountdown } from './PomodoroCountdown'

export const PomodoroScreen = () => {
    return (
        <div
            className="temp-w-100 temp-d-flex temp-df-columns"
        >

            <Navbar />

            <PomodoroCountdown />

        </div>
    )
}
