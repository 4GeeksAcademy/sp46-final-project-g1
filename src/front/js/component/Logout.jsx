import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Logout = () => {
    const {store, actions} = useContext(Context);
    const removeStorage = () => {
        localStorage.clear();  // Deberiamos borrar solamente el token! (lo necesario)
        actions.logout();
    }

    return (
        <span onClick={removeStorage}>
            <Link to="/" className="dropdown-item text-dark">
                Salir
            </Link>
        </span>
    )
}