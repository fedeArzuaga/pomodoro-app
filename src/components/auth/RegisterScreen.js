import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegistering } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const [ values, handleInputChange ] = useForm({
        name: 'Federico Arzuaga',
        email: 'fedemaxio.30@gmail.com',
        password: '15112016karen',
        confirm_password: '15112016karen'
    });

    const { name, email, password, confirm_password } = values;

    const dispatch = useDispatch();

    const handleRegisterUser = (event) => {
        event.preventDefault();

        const user = { name, email, password }

        dispatch(
            startRegistering( user )
        );

    }

    return (
        <main className="auth auth__register-screen temp-d-flex temp-df-middle temp-df-center">
            
            <form
                className="form"
                onSubmit={ handleRegisterUser }
            >

                <h1 className="temp-text-center">
                    Create an account
                </h1>

                <label
                    className="form__label"
                >
                    <div>
                        Full name
                    </div>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        className="form__input"
                        autoComplete="off"
                        value={ name }
                        onChange={ handleInputChange }
                    />
                </label>

                <label
                    className="form__label temp-mt-2"
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
                    <div>
                        Confirm password
                    </div>
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        className="form__input"
                        autoComplete="off"
                        value={ confirm_password }
                        onChange={ handleInputChange }
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

                {/* <div>
                <br />
                    Name: { name }<br />
                    Email: { email }<br />
                    Password: { password }<br />
                    Confirm password: { confirm_password }
                </div> */}

            </form>

        </main>
    )
}
