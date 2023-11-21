import React from "react";
import { CardShopping } from "../component/CardShopping.jsx";
import { Link } from "react-router-dom";
import { ProductsOverFlow } from "../component/ProductsOverFlow.jsx";
import { BotonPago } from "../component/BotonPago.jsx";


export const ShoppingCart = () => {

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-8">
                    <CardShopping />
                </div>
                <div className="col-4">
                    <div className="d-flex flex-column mb-3 border border-primary rounded p-3">
                        <div className="p-2">
                            <h5 className="text-dark">Resumen de mi pedido</h5>
                            <div className="d-flex justify-content-between mt-3">
                                <div className="text-dark">
                                    <p className="m-0">Productos</p>
                                    <p>Envío</p>
                                </div>
                                <div className="text-dark">
                                    <p className="m-0">30.00€</p>
                                    <p>3.99€</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="p-2">
                            <div className="d-flex justify-content-between mt-3">
                                <div>
                                    <h5 className="text-dark">Total</h5>
                                </div>
                                <div className="text-dark">
                                    <p>33.99€</p>
                                </div>
                            </div>
                            <div className="d-grid mt-2">
                                <BotonPago />
                            </div>
                        </div>
                        <hr />
                        <div className="p-2">
                            <div className="d-flex align-items-center flex-column">
                                <div>
                                    <h6 className="text-dark mt-3">Pago 100% seguro</h6>
                                </div>
                                <div>
                                    <img src="https://www.tiendanimal.es/on/demandware.static/Sites-TiendanimalES-Site/-/default/dw559bc14b/images/logos-payment.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex align-items-center flex-column mb-2 ">
                <div>
                    <h3 className="text-dark">Poductos recomendados</h3>
                </div>
                <div>
                    <ProductsOverFlow />
                </div>
            </div>
        </div>
    )
}