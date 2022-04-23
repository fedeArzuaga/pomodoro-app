import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { login } from '../actions/auth';
import { setActive } from '../actions/pomodoros';
import { startGettingCurrentData } from '../actions/pomodoros';
import { HomeScreen } from '../components/home/HomeScreen';
import { PublicRoutes } from '../routers/PublicRoutes'
import { AppScreens } from './AppScreens';
import { AuthRouter } from './AuthRouter';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState( true );

    useEffect(() => {
      
        const auth = getAuth();
        onAuthStateChanged(auth, ( user ) => {

            if ( user ) {

                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch(
                    startGettingCurrentData( user.uid )
                );

                dispatch(
                    setActive({
                        minutes: "25",
                        breakTime: "5",
                        rounds: "4"
                    })
                );

                setChecking( false );
                
            } else {
               
                setChecking( false );
                
            } 

        });

    }, [ checking, dispatch ])

    if ( checking ) {

        return (
            <div className="temp-d-flex temp-df-columns temp-df-center temp-df-middle temp-vh-100">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                <h1 className="temp-fw-300">Loading...</h1>
            </div>
        )

    }


    return (
        <Router>

            <Routes>
                
                <Route path="/auth/*" element={
                    <PublicRoutes>
                        <AuthRouter />
                    </PublicRoutes>
                } />

                <Route path="/*" element={
                    <PrivateRoutes>
                        <AppScreens />
                    </PrivateRoutes>
                } />

                <Route path="/*" element={ <Navigate to="/" /> }/>

            </Routes>

        </Router>
    )
}
