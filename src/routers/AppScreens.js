import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { HomeScreen } from '../components/home/HomeScreen'
import { CongratsScreen } from '../components/pomodoro/CongratsScreen'

export const AppScreens = () => {
    return (
        
        <Routes>
            <Route path="/" element={ <HomeScreen /> } />
            <Route path="congrats" element={ <CongratsScreen/> } />
            <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>

    )
}
