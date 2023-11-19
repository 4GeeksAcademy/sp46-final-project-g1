import React from "react";
import { Link } from "react-router-dom";


export const Form = () => {
    return (
        <div className="container">
            <h1 className="d-flex justify-content-center mt-4 text-dark">Información Personal</h1>
            <div className="container bg-primary-subtle rounded" style={{ width: '50%', height: '50%' }}>
                <form className="text-dark mt-3 p-2">
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="firstname" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="firstname" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastname" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="lastname" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" className="form-label mt-3">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAddress" className="form-label mt-3">Dirección</label>
                        <input type="text" className="form-control" id="exampleInputAddress" autoComplete="off" />
                    </div>
                    <div className="row mt-3">
                        <div className="col-8">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="city" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="postalcode" className="form-label">Código Postal</label>
                            <input type="text" className="form-control" id="postalcode" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="exampleSelect1" className="form-label">Identificación</label>
                            <select className="form-select" id="identification">
                                <option selected>Tipo</option>
                                <option>Dni</option>
                                <option>Nie</option>
                                <option>Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="postalcode" className="form-label">Número de identificación</label>
                            <input type="text" className="form-control" id="identificationNumber" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="typeOfCard" className="form-label">Método de Pago</label>
                        <div className="mt-1">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="mastercard" value="option1" />
                                <label className="form-check-label" htmlFor="inlineRadio1"><i className="fab fa-cc-mastercard"></i></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="visa" value="option2" />
                                <label className="form-check-label" htmlFor="inlineRadio2"><i className="fab fa-cc-visa"></i></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="amex" value="option3" />
                                <label className="form-check-label" htmlFor="inlineRadio3"><i className="fab fa-cc-amex"></i></label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="paypal" value="option4" />
                                <label className="form-check-label" htmlFor="inlineRadio4"><i className="fab fa-cc-paypal"></i></label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mt-3">
                        <input type="text" className="form-control" id="floatingCardName" placeholder="Full Name" />
                        <label htmlFor="floatingCardName">Nombre del titular</label>
                    </div>
                    <div className="d-flex mt-3">
                        <div className="flex-grow-1 w-75 form-floating gx-1">
                            <input type="text" className="form-control" id="floatingCardNumber" placeholder="Card Number" />
                            <label htmlFor="floatingFullName">Número de tarjeta</label>
                        </div>
                        <div className="form-floating ms-1 gx-1 w-50">
                            <input type="text" className="form-control" id="floatingExpirationDate" placeholder="Full Name" />
                            <label htmlFor="floatingExpirationDate">Fecha de caducidad</label>
                        </div>
                        <div className="form-floating ms-1 gx-1 w-25">
                            <input type="text" className="form-control" id="floatingCvv" placeholder="Full Name" />
                            <label htmlFor="floatingCvv">Cvv</label>
                        </div>
                    </div>
                    <div className="p-3 bg-opacity-10 d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-primary me-2">Enviar</button>
                        <Link to="/account" className="btn btn-secondary">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}