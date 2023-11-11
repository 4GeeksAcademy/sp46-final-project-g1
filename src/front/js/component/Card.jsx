import React from "react";
import { StarReating } from "./StarReating.jsx";


export const Card = () => {

    return (
        <section style={{ background: '#eee' }}>
            <div class="container py-5">
                <div class="card" style={{ width: '250px', height: '375px' }}>
                    <div class="d-flex justify-content-end p-3">
                        <button type="button" class="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                            style={{ width: '35px', height: '35px' }}>
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-computo-escritorio-moderno_114360-12156.jpg"
                        class="card-img-top" alt="Laptop" />
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                        </div>

                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0">HP Notebook</h5>
                            <h5 class="text-dark mb-0">500€</h5>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <p class="text-muted mt-1">Available: <span class="fw-bold">6</span></p>
                            <div class="ms-auto text-warning">
                                <StarReating />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}