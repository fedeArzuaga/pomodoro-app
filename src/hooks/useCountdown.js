import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";


export const useCountdown = ({ minutesTime, breakTime, roundsGoal }) => {

    const [minutesTimeState, setMinutesTimeState] = useState( parseInt( minutesTime ) );
    const [breakTimeState, setBreakTimeState] = useState( parseInt( breakTime ) );
    const [roundsGoalState, setRoundsGoalState] = useState( parseInt( roundsGoal ) );
    const [isOnSession, setIsOnSession] = useState( true );
    const [isRunning, setIsRunning] = useState( false );
    const [secondsTime, setSecondsTime] = useState(0);
    const [roundsDone, setRoundsDone] = useState(1)

    const countdown = useRef(null);

    const handlePlayCountdown = () => {
        setIsRunning( true );
        // setMinutesTimeState( minutesTimeState => minutesTimeState - 1 );
    } 

    useEffect( () => {

        if ( isRunning ) {

            countdown.current = setInterval(() => {
                setSecondsTime( secondsTime => secondsTime - 1 );
            }, 1000);

        }

    }, [ isRunning ])

    useEffect( () => {

        if ( secondsTime === -1 ) {
            setMinutesTimeState( minutesTimeState => minutesTimeState - 1 );
            setSecondsTime( 59 )
        }

    }, [ secondsTime ])

    useEffect( () => {

        if ( minutesTimeState === 0 && secondsTime === -1 ) {
            clearInterval( countdown.current )

            if ( isOnSession ) {
                setRoundsDone( roundsDone => roundsDone + 1 );
            }

            setIsOnSession( isOnSession => !isOnSession );
        }

    }, [ minutesTimeState, secondsTime ])

    useEffect( () => {

        if ( isOnSession && roundsDone > 1 ) {
            setMinutesTimeState( parseInt( minutesTime ) );
            setSecondsTime( 0 )

            countdown.current = setInterval(() => {
                setSecondsTime( secondsTime => secondsTime - 1 );
            }, 1000);
            
        } else if ( !isOnSession && roundsDone > 1 ) {
            setMinutesTimeState( parseInt( breakTime ) );
            setSecondsTime( 0 )

            countdown.current = setInterval(() => {
                setSecondsTime( secondsTime => secondsTime - 1 );
            }, 1000);

        }

    }, [ isOnSession ])

    const updateCountdown = ( minutesTime, breakTime, roundsGoal ) => {
        setMinutesTimeState( parseInt( minutesTime ) )
        setBreakTimeState( parseInt( breakTime ) )
        setRoundsGoalState( parseInt( roundsGoal ) )
    }

    return [ 
        minutesTimeState,
        secondsTime,
        breakTime, 
        roundsGoalState,
        roundsDone, 
        handlePlayCountdown, 
        updateCountdown, 
        isRunning,
        setIsRunning, 
        isOnSession
    ];

}