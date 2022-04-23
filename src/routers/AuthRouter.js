import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        
        <Routes>
            <Route path="register" element={ <RegisterScreen /> } />
            <Route path="login" element={ <LoginScreen/> } />
            <Route path="*" element={ <Navigate to="login" /> } />
        </Routes>

    )
}
