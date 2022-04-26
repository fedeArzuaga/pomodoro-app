import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../helpers/showNotification";

const sidebar = document.querySelector("#sidebar");

export const useCountdown = ({ minutesTime, breakTime, roundsGoal }) => {

    const [minutesTimeState, setMinutesTimeState] = useState( parseInt( minutesTime ) );
    const [breakTimeState, setBreakTimeState] = useState( parseInt( breakTime ) );
    const [roundsGoalState, setRoundsGoalState] = useState( parseInt( roundsGoal ) );
    const [isOnSession, setIsOnSession] = useState( true );
    const [isRunning, setIsRunning] = useState( false );
    const [secondsTime, setSecondsTime] = useState(0);
    const [roundsDone, setRoundsDone] = useState(1);
    const [isOnPause, setIsOnPause] = useState( true );

    const dispatch = useDispatch();
    const countdown = useRef(null);

    useEffect( () => {

        if ( isRunning && !countdown.current ) {
            
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
            showNotification("Session time!", "Your session has started now. Time to focus on what you're studying/working")
            playClock();

            countdown.current = setInterval(() => {
                setSecondsTime( secondsTime => secondsTime - 1 );
            }, 1000);
            
        } else if ( !isOnSession && roundsDone > 1 ) {
            setMinutesTimeState( parseInt( breakTime ) );
            setSecondsTime( 0 )
            
            if ( roundsDone > roundsGoalState ) {
                showNotification("Congratulations!", "You have finished your pomodoro session!")
            } else {
                showNotification("Break time!", "Time to take a break. Come back when your next session starts")
            }

            playClock();

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

    const runCountdown = () => {
        countdown.current = setInterval(() => {
            setSecondsTime( secondsTime => secondsTime - 1 );
        }, 1000);
    }

    const handlePlayCountdown = () => {
        setIsRunning( true );
        setIsOnPause( false );

        if ( countdown.current ) {
            runCountdown();
        }

    } 

    const handlePauseCountdown = () => {
        clearInterval( countdown.current );
        setIsOnPause( true )
        updateCountdown( minutesTimeState, breakTime, roundsGoal );
    }

    const handleStopCountdown = () => {
        clearInterval( countdown.current );
        updateCountdown( minutesTime, breakTime, roundsGoal );
        setSecondsTime( 0 );
        setRoundsDone( 1 );
        setIsOnSession( true );
        setIsRunning( false );
        setIsOnPause( true );
    }

    const playClock = () => {
        const clock = new Audio("https://res.cloudinary.com/dubgtdvlk/video/upload/v1650910211/clock_tdukin.mp3");
        clock.play();
    }

    return [ 
        isOnPause,
        minutesTimeState,
        secondsTime,
        breakTime, 
        roundsGoalState,
        roundsDone, 
        handlePlayCountdown, 
        updateCountdown, 
        isRunning,
        setIsRunning, 
        isOnSession,
        handlePauseCountdown,
        handleStopCountdown
    ];

}