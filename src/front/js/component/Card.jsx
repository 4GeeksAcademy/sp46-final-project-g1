import React from "react";
import { StarReating } from "./StarReating.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Card = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    console.log(params);
    actions.getProducts(params)

	/* const params = useParams();
	console.log(params);
	actions.getProducts(params.idProducts) */

    return (
        <section>
            <div className="container py-4">
                <div className="card" style={{ width: '15rem' }}>
                    <div className="d-flex justify-content-end p-3">
                        <button type="button" className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: '35px', height: '35px' }}>
                            <i className="far fa-heart"></i>
                        </button>
                    </div>
                    <Link to="/product">
                        <img src={""}
                            className="card-img-top object-fit-fill" alt="Pienso" />
                    </Link>
                    <div className="card-body text-dark">
                        <div className="d-flex justify-content-between">
                            <p className="small"><a href="#!">Pienso</a></p>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">{store.results.name}</h5>
                            <h5 className="text-dark mb-0">30€</h5>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="mt-1">Disponible: <span className="fw-bold">6</span></p>
                            <div className="ms-auto text-warning">
                                <StarReating />
                            </div>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="button">Añadir al carrito <i className="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}