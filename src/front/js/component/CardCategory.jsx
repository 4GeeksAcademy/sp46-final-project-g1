import React from "react";
import { Link } from "react-router-dom";


export const CardCategory = () => {

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 fw-semibold text-dark">Categorías</h1>
            <div className="container d-flex justify-content-between">
                <Link to="/demo" className="text-decoration-none">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h3 className="text-center text-dark fw-semibold">Pienso</h3>
                        </div>
                        <div className="object-fit-contain mh-100">
                            <img src="https://i0.wp.com/alimentacionanimales.com/wp-content/uploads/2023/06/bodegon-sacos_GF_fish_OKggg-1.png?fit=1200%2C1100&ssl=1"
                                className="img-fluid" alt="pienso" />
                        </div>
                    </div>
                </Link>
                <Link to="/demo" className="text-decoration-none">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h3 className="text-center text-dark fw-semibold">Snacks</h3>
                        </div>
                        <img src="https://i0.wp.com/alimentacionanimales.com/wp-content/uploads/2023/06/bodegon-sacos_GF_fish_OKggg-1.png?fit=1200%2C1100&ssl=1" className="card-img-top" alt="snacks" />
                    </div>
                </Link>
                <Link to="/demo" className="text-decoration-none">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h3 className="text-center text-dark fw-semibold">Juguetes</h3>
                        </div>
                        <img src="https://i0.wp.com/alimentacionanimales.com/wp-content/uploads/2023/06/bodegon-sacos_GF_fish_OKggg-1.png?fit=1200%2C1100&ssl=1"
                            className="img-fluid" alt="juguetes" />
                    </div>
                </Link>
                <Link to="/demo" className="text-decoration-none">
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h3 className="text-center text-dark fw-semibold">Accesorios</h3>
                        </div>
                        <img src="https://i0.wp.com/alimentacionanimales.com/wp-content/uploads/2023/06/bodegon-sacos_GF_fish_OKggg-1.png?fit=1200%2C1100&ssl=1" className="card-img-top" alt="accesorios" />
                    </div>
                </Link>
            </div>
        </div>
    )
}