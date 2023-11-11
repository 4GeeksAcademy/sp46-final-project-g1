import React from "react";
import { StarReating } from "./StarReating.jsx";


export const Card = () => {

    return (
        <section style={{ background: '#eee' }}>
            <div className="container py-5">
                <div className="card" style={{ width: '250px', height: '375px' }}>
                    <div className="d-flex justify-content-end p-3">
                        <button type="button" className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: '35px', height: '35px' }}>
                            <i className="far fa-heart"></i>
                        </button>
                    </div>
                    <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-computo-escritorio-moderno_114360-12156.jpg"
                        className="card-img-top" alt="Laptop" />
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <h5 className="mb-0">HP Notebook</h5>
                            <h5 className="text-dark mb-0">500€</h5>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <p className="text-muted mt-1">Available: <span className="fw-bold">6</span></p>
                            <div className="ms-auto text-warning">
                                <StarReating />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}