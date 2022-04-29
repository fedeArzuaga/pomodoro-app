import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin, startLoginWithGoogle } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { getImages } from './../../helpers/getImages';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = values;

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            startLogin( email, password)
        )
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault();

        dispatch(
            startLoginWithGoogle()
        )
    }

    return (
        <div className="temp-container">

            <main className="auth auth__login-screen temp-d-flex temp-df-middle temp-df-center">
            
                <form
                    className="form"
                    onSubmit={ handleSubmit }
                >

                    <h1 className="temp-text-center">
                        Login
                    </h1>

                    <label
                        className="form__label"
                    >
                        <div>
                            Email
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form__input"
                            autoComplete="off"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </label>

                    <label
                        className="form__label temp-mt-2"
                    >
                        <div>
                            Password
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form__input"
                            autoComplete="off"
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </label>

                    <label
                        className="form__label temp-mt-2"
                    >
                        <input
                            type="submit"
                            className="form__input form__input--button"
                            value="Log In"
                        />
                    </label>

                    <Link 
                        to="/auth/register"
                        className="temp-link temp-mt-2"
                    >
                        Not registered yet? Create an account
                    </Link>

                    <div
                        className="temp-divider temp-fs-x15 temp-mt-2 temp-text-center"
                    >
                        <span>
                            Or
                        </span>
                    </div>

                    <h2
                        className="temp-mt-2 temp-text-center"
                    >
                        Sign in with Social Media
                    </h2>

                    <button
                        className="temp-cta-button temp-mt-2"
                        onClick={ handleGoogleLogin }
                    >
                        <img
                            src={ getImages(`./icons/google.png`) }
                            className="temp-icons"
                        />
                        Google
                    </button>

                    {/* <button
                        className="temp-cta-button temp-mt-2"
                    >
                        <img
                            src={ getImages(`./icons/github.png`) }
                            className="temp-icons"
                        />
                        Github
                    </button> */}

                </form>

            </main>

        </div>
    )
}

