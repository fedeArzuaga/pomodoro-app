import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../actions/pomodoros';

export const MofidyiersButtons = ({ property, min, max, quantity }) => {

    const { myPomodoros: { active } } = useSelector( state => state );

    const dispatch = useDispatch();

    return (
        
        <div
            className="temp-mt-2 temp-d-flex temp-df-center"
        >
            <button 
                className="pomodoro__button"
                onClick={ (e) => {
                    e.preventDefault(); 
                    if ( parseInt(active[property]) > min ) {
                        dispatch(
                            setActive({
                                ...active,
                                [property]: parseInt(active[property]) - quantity
                            })
                        )
                    }
                }}
            >
                -
            </button>
            <button
                className="pomodoro__button"
                onClick={ (e) => {
                    e.preventDefault(); 
                    if ( parseInt(active[property]) < max ) {
                        dispatch(
                            setActive({
                                ...active,
                                [property]: parseInt(active[property]) + quantity
                            })
                        )
                    }
                }}
            >
                +
            </button>
        </div>

    )
}
