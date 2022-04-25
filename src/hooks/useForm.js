import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../actions/pomodoros';

export const useForm = (initialState = {}) => {

    const { myPomodoros: { active } } = useSelector( state => state );

    const dispatch = useDispatch();
  
    const [values, setValues] = useState( initialState );

    const reset = ( newFormState = initialState ) => {
        setValues( newFormState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
        dispatch(
            setActive({
                ...active,
                [target.name]: target.value
            })
        )
    }

    return [values, setValues, handleInputChange, reset];

}