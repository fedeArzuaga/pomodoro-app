import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { getImages } from '../../helpers/getImages';

export const Navbar = () => {

    const { auth } = useSelector( state => state );

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(
            startLogout()
        )
    }

    return (
        <nav
            className="navbar temp-d-flex temp-df-space-between temp-df-middle"
        >
            <div className="navbar__user-info">
                {/* <img src={ auth?.photoURL ? auth.photoURL : "" } /> */}
                <span>
                    { auth.name }
                </span>
            </div>

            <ul
                className="navbar__list"
            >
                <li
                    className="navbar__list-item"
                >
                    <div
                        className="pointer"
                        onClick={ handleLogout }
                    >
                        <span>
                            Log out
                        </span>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
