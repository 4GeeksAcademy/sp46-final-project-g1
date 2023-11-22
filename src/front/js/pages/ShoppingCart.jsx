import React, { useContext } from "react";
import { CardShopping } from "../component/CardShopping.jsx";
import { Link } from "react-router-dom";
import { ProductsOverFlow } from "../component/ProductsOverFlow.jsx";
import { BotonPago } from "../component/BotonPago.jsx";
import { Context } from "../store/appContext.js";


export const ShoppingCart = () => {
    const { store, actions } = useContext(Context)

    return (
        <div className="container my-5">
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                    <div className="col-lg-8">
                        <div className="p-3">
                            <CardShopping />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="p-3">
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
                                        <div className="p-3">
                                            <img src="https://www.tiendanimal.es/on/demandware.static/Sites-TiendanimalES-Site/-/default/dw559bc14b/images/logos-payment.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-8">
                    <div className="col">
                        <div className="p-3">
                            <CardShopping />
                        </div>
                    </div>
                    {store.shoppingCartItems.map((product) => (
                        <div className="col">
                            <div className="p-3">
                            <CardShopping key={product.id} product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
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