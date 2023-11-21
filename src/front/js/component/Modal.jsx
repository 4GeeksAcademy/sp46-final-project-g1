import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext.js";
import { QuantityButton } from "./QuantityButton.jsx";
import { Link } from "react-router-dom";


export const Modal = (props) => {
    const { store, actions } = useContext(Context);


    const handleAddItem = async () => {
        store.currentItemCart = {
            item_price: props.product.pricing,
            shipping_item_price: 0,
            product_id: props.product.id
        }
        await actions.postShoppingCartItem()
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container border border-primary rounded mb-2">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="p-2">
                                            <img src="https://www.dia.es/product_images/130332/130332_ISO_0_ES.jpg"
                                                className="card-img-top object-fit-fill" alt="Pienso" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-2 text-dark text-start">
                                            <p className="m-0">Purina, friskies pienso para perros</p>
                                            <Link to="/product" data-bs-toggle="tooltip" title="Tooltip">Mas detalles</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-start text-dark mb-3 fw-semi-bold">Formato</h5>
                            </div>
                            <div className="container d-flex justify-content-between text-dark">
                                <div className="input">
                                    <div className="form-check d-flex justify-content-start">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label ms-2" htmlFor="flexRadioDefault1">
                                            Saco de 4 kg
                                        </label>
                                    </div>
                                    <div className="form-check d-flex justify-content-start">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label ms-2" htmlFor="flexRadioDefault2">
                                            Saco de 15 kg
                                        </label>
                                    </div>
                                </div>
                                <div className="price">
                                    <p className="fw-semibold mb-0">22.00 €</p>
                                    <p className="fw-semibold">63.99 €</p>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <QuantityButton />
                                </div>
                                <div className="col-8">
                                    <div className="d-grid gap-2">
                                        <button onClick={handleAddItem} className="btn btn-primary" type="button">Añadir al carrito <i className="fas fa-shopping-cart"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}