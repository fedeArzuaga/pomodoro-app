import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegistering } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

export const RegisterScreen = () => {

    const [ values, handleInputChange ] = useForm({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const dispatch = useDispatch();

    const { name, email, password, confirm_password } = values;

    const [validate, setValidate] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    
    
    const handleRegisterUser = (event) => {
        event.preventDefault();
        
        if ( 
            validate.name.length === 0 &&
            validate.email.length === 0 &&
            validate.password.length === 0 &&
            validate.confirm_password.length === 0 
         ) {

            const user = { name, email, password }

            dispatch(
                startRegistering( user )
            );
            
        }

    }

    return (
        <div className="temp-container">

            <main className="auth auth__register-screen temp-d-flex temp-df-middle temp-df-center">
                
                <form
                    className="form"
                    onSubmit={ handleRegisterUser }
                >

                    <h1 className="temp-text-center">
                        Create an account
                    </h1>

                    <label
                        className={ validate.name.length ? "form__label form__label--error" : "form__label" }
                    >
                        <div>
                            { validate.name.length ? validate.name : "Full name" }
                        </div>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            className="form__input"
                            autoComplete="off"
                            value={ name }
                            onChange={ handleInputChange }
                            onBlur={ () => {
                                if ( name.length === 0 ) {
                                    setValidate({
                                        ...validate,
                                        name: "Name should have at least one character"
                                    })
                                } else {
                                    setValidate({
                                        ...validate,
                                        name: ""
                                    })
                                }
                            } }
                        />
                    </label>

                    <label
                        className={ validate.email.length ? "form__label temp-mt-2 form__label--error" : "form__label temp-mt-2" }
                    >
                        <div>
                            { validate.email.length ? validate.email : "Email" }
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form__input"
                            autoComplete="off"
                            value={ email }
                            onChange={ handleInputChange }
                            onBlur={ () => {
                                if ( !validator.isEmail(email) ) {
                                    setValidate({
                                        ...validate,
                                        email: "Please enter a valid email"
                                    })
                                } else {
                                    setValidate({
                                        ...validate,
                                        email: ""
                                    })
                                }
                            } }
                        />
                    </label>

                    <label
                        className={ validate.password.length ? "form__label temp-mt-2 form__label--error" : "form__label temp-mt-2" }
                    >
                        <div>
                            { validate.password.length ? validate.password : "Password" }
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form__input"
                            autoComplete="off"
                            value={ password }
                            onChange={ handleInputChange }
                            onBlur={ () => {
                                if ( password.length < 6 ) {
                                    setValidate({
                                        ...validate,
                                        password: "Set a password of at least 6 characters"
                                    })
                                } else {
                                    setValidate({
                                        ...validate,
                                        password: ""
                                    })
                                }
                            } }
                        />
                    </label>

                    <label
                        className={ validate.confirm_password.length ? "form__label temp-mt-2 form__label--error" : "form__label temp-mt-2" }
                    >
                        <div>
                            { validate.confirm_password.length ? validate.confirm_password : "Confirm password" }
                        </div>
                        <input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            className="form__input"
                            autoComplete="off"
                            value={ confirm_password }
                            onChange={ handleInputChange }
                            onBlur={ () => {
                                if ( confirm_password !== password ) {
                                    setValidate({
                                        ...validate,
                                        confirm_password: "Both passwords should be exactly equal"
                                    })
                                } else {
                                    setValidate({
                                        ...validate,
                                        confirm_password: ""
                                    })
                                }
                            } }
                        />
                    </label>

                    <label
                        className="form__label temp-mt-2"
                    >
                        <input
                            type="submit"
                            className="form__input form__input--button"
                            value="Create account"
                        />
                    </label>

                    <Link 
                        to="/auth/login"
                        className="temp-link temp-mt-2"
                    >
                        Already registered? Sign in with your account
                    </Link>

                </form>

            </main>

        </div>
    )
}
