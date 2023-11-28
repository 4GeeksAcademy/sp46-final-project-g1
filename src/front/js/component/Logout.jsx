import React from "react";
import { Link } from "react-router-dom";


export const Logout = () => {
    const removeStorage = () => {
        localStorage.clear();
        location.reload();
    }

    return (
        <span onClick={removeStorage}>
            <Link to="/" className="dropdown-item text-dark">
                Salir
            </Link>
        </span>
    )
}