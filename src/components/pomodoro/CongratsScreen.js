import React from 'react';
import { Link } from 'react-router-dom';

export const CongratsScreen = () => {
    return (
        <main className="congrats__congrats-screen">

            <div className="temp-vh-100 temp-w-100 temp-d-flex temp-df-center temp-df-middle">

                <div className="congrats__congrats-content">
                    <h1>Congratulations!</h1>
                    <p>
                        You just have finished your Pomodoro session. Try again when you are ready to have another session.
                    </p>
                    <Link className="temp-cta-button temp-mt-4" to="/">
                        Go to homepage
                    </Link>
                </div>

            </div>

        </main>
    )
}
