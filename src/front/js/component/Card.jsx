import React from "react";
import { StarReating } from "./StarReating.jsx";
import { Link } from "react-router-dom";


export const Card = () => {

    return (
            <div className="container">
                <div className="card" style={{ width: '15rem' }}>
                    <div className="d-flex justify-content-end p-3">
                        <button type="button" className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: '35px', height: '35px' }}>
                            <i className="far fa-heart"></i>
                        </button>
                    </div>
                    <Link to="/product" className="text-center">
                        <img src="https://www.dia.es/product_images/130332/130332_ISO_0_ES.jpg"
                            className="card-img-top object-fit-fill" alt="Pienso" style={{ width: '50%', height: '50%' }} />
                    </Link>
                    <div className="card-body text-dark">
                        <div className="d-flex justify-content-between">
                            <p className="small"><a href="#!">Pienso</a></p>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">Purina Adulto</h5>
                            <h5 className="text-dark mb-0">30€</h5>
                        </div>
                        {/* <div className="d-flex justify-content-between mb-2">
                            <p className="mt-1">Disponible: <span className="fw-bold">6</span></p>
                            <div className="ms-auto text-warning">
                                <StarReating />
                            </div>
                        </div> */}
                        <div className="d-grid">
                            <button className="btn btn-primary" type="button">Añadir al carrito <i className="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    )
}