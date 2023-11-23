import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Form = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState(store.user.first_name);
    const [lastName, setLastName] = useState(store.user.last_name);
    const [email, setEmail] = useState(store.user.email);
    const [password, setPassword] = useState(store.user.password);
    const [address, setAddress] = useState(store.user.address);
    const [idNumber, setIdNumber] = useState(store.user.identification_number);
    const [typeIdNumber, setTypeIdNumber] = useState(store.user.identification_type);
    const [viewPassword, setViewPassword] = useState(false);

    const navigate = useNavigate()

    const handleEmail = (event) => setEmail(event.target.value)
    const handleName = (event) => setName(event.target.value)
    const handleLastName = (event) => setLastName(event.target.value)
    const handleAddress = (event) => setAddress(event.target.value)
    const handleIdNumber = (event) => setIdNumber(event.target.value)
    const handleTypeIdNumber = (event) => setTypeIdNumber(event.target.value)
    const handlePassword = event => setPassword(event.target.value)
    const handleViewPasswort = () => setViewPassword(!viewPassword)


    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.putMyUsers()
        navigate("/account")
    }
    return (
        <div className="container mb-5">
            <h1 className="d-flex justify-content-center mt-4 text-dark">Información Personal</h1>
            <div className="container bg-primary-subtle rounded" style={{ width: '50%', height: '50%' }}>
                <form className="text-dark mt-3 p-2" onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="firstname" className="form-label">Nombre</label>
                            <input type="text" value={name} onChange={handleName} className="form-control" id="firstname" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="lastname" className="form-label">Apellidos</label>
                            <input type="text" value={lastName} onChange={handleLastName} className="form-control" id="lastname" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" className="form-label mt-3">Email</label>
                        <input type="email" value={email} onChange={handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="input-group mt-2">
                        <div className="form-floating">
                            <input type={viewPassword ? "text" : "password"} value={password} onChange={handlePassword}
                                className="form-control" id="floatingInputGroup1" placeholder="Password" />
                            <label htmlFor="floatingInputGroup1">Password</label>
                        </div>
                        <span className="input-group-text" onClick={handleViewPasswort}>
                            {viewPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAddress" className="form-label mt-3">Dirección</label>
                        <input type="text" value={address} onChange={handleAddress} className="form-control" id="exampleInputAddress" autoComplete="off" />
                    </div>
                    <div className="container text-start">
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div className="col">
                                <div className="mt-2 text-start">
                                    <label htmlFor="exampleSelect1" className="form-label">Identificación</label>
                                    <select value={typeIdNumber} onChange={handleTypeIdNumber} className="form-select" id="identification">
                                        <option selected>Tipo</option>
                                        <option>Dni</option>
                                        <option>Nie</option>
                                        <option>Pasaporte</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mt-2 text-start">
                                    <label htmlFor="postalcode" className="form-label">Número de identificación</label>
                                    <input type="text" value={idNumber} onChange={handleIdNumber} className="form-control" id="identificationNumber" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-3">
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
                    </div> */}
                    <div className="container text-center mt-3">
                        <div className="row row-cols-1 row-cols-lg-5">
                            <div className="col d-flex justify-content-center">
                                <div className="p-3">
                                    <button type="submit" className="btn btn-primary me-2">Enviar</button>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <div className="p-3">
                                    <Link to="/account" className="btn btn-secondary">
                                        Cancelar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}