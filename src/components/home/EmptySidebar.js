import React from 'react'
import { getImages } from '../../helpers/getImages'

export const EmptySidebar = () => {
    return (
        <div
            className="sidebar__empty-content temp-d-flex temp-df-center temp-df-middle"
        >
            <div
                className="temp-d-flex temp-df-center temp-df-middle temp-df-columns"
            >
                <div>
                    <img
                        src={ getImages("./icons/temporizador.png") }
                    />
                </div>
                <p
                    className="temp-mt-2 temp-text-center"
                >
                    You don't have any pomodoros saved yet. Try adding your first pomodoro clicking on the star icon
                </p>
            </div>
        </div>
    )
}
