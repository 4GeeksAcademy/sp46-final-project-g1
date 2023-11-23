import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export const Account = () => {


    return (
        <div className="container">
            <h3 className="text-start mt-5">Mi datos</h3>
            <div className="container px-4 text-center my-5">
                <div className="row gx-5">
                    <div className="col border border-primary me-3">
                        <div className="p-3">
                            <div className="d-flex justify-content-between">
                                <h5>Mis datos</h5>
                                <Link className="text-decoration-none" to="/form">
                                    Editar <i className="fas fa-edit"></i>
                                </Link>
                            </div>
                            <hr />
                            <div className="card-body text-start mt-4 text-dark">
                                <dl>
                                    <dt>Nombre</dt>
                                    <dd>Pedro</dd>
                                </dl>
                                <dl>
                                    <dt>Apellidos</dt>
                                    <dd>Perez</dd>
                                </dl>
                                <dl>
                                    <dt>Email</dt>
                                    <dd>pedro@gmail.com</dd>
                                </dl>
                                <dl>
                                    <dt>Teléfono</dt>
                                    <dd>123456789</dd>
                                </dl>
                                <dl>
                                    <dt>Address</dt>
                                    <dd>Calle inventada, 10. Madrid</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="col border border-primary">
                        <div className="p-3">
                            <div className="d-flex">
                                <h5>Mis pedidos</h5>
                            </div>
                            <hr />
                            <div className="container text-center">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="p-2">
                                            <img src="https://www.dia.es/product_images/130332/130332_ISO_0_ES.jpg"
                                                className="card-img-top object-fit-fill" alt="Pienso" />
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div className="p-2 text-dark text-start">
                                            <p className="m-0">Purina, friskies pienso para perros</p>
                                            <p className="m-0">Cantidad: 1</p>
                                            <p className="m-0">Peso: 12kg</p>
                                            <p className="m-0">Precio: 30.00€</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <div className="p-2">
                                            <img src="https://www.trixie.es/WebRoot/StoreWeb/Shops/Trixie/5CFB/84B3/2137/4702/CD5A/0A6E/0E02/5ED7/PHO_PRO_CLIP_31544-1_h.jpg"
                                                className="card-img-top object-fit-fill" alt="Pienso" />
                                        </div>
                                    </div>
                                    <div className="col-9 mb-5">
                                        <div className="p-2 text-dark text-start">
                                            <p className="m-0">Trixie, lamb bites</p>
                                            <p className="m-0">Cantidad: 2</p>
                                            <p className="m-0">Peso: 0.100kg</p>
                                            <p className="m-0">Precio: 15.00€</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="container text-start text-dark">
                                    <p className="fw-semibold">Total pedido: 45.00€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}