import React from "react";


export const Form = () => {
    return (
        <div className="container bg-primary-subtle rounded" style={{ width: '50%', height: '50%' }}>
            <form className="text-dark mt-5 p-2">
                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="firstname" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstname" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastname" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail" className="form-label mt-3">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress" className="form-label mt-3">Address</label>
                    <input type="text" className="form-control" id="exampleInputAddress" autoComplete="off" />
                </div>
                <div className="row mt-3">
                    <div className="col-8">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" />
                    </div>
                    <div className="col-4">
                        <label htmlFor="postalcode" className="form-label">Postal Code</label>
                        <input type="text" className="form-control" id="postalcode" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <label htmlFor="exampleSelect1" className="form-label">Identification</label>
                        <select className="form-select" id="identification">
                            <option selected>Type</option>
                            <option>Dni</option>
                            <option>Nie</option>
                            <option>Passport</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label htmlFor="postalcode" className="form-label">Identification number</label>
                        <input type="text" className="form-control" id="identificationNumber" />
                    </div>
                </div>
                <div className="mt-3">
                    <label htmlFor="typeOfCard" className="form-label">Payment method</label>
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
                    <label htmlFor="floatingCardName">Card Full Name</label>
                </div>
                <div className="d-flex mt-3">
                    <div className="flex-grow-1 w-75 form-floating gx-1">
                        <input type="text" className="form-control" id="floatingCardNumber" placeholder="Card Number" />
                        <label htmlFor="floatingFullName">Card Number</label>
                    </div>
                    <div className="form-floating ms-1 gx-1 w-50">
                        <input type="text" className="form-control" id="floatingExpirationDate" placeholder="Full Name" />
                        <label htmlFor="floatingExpirationDate">Expiration Date</label>
                    </div>
                    <div className="form-floating ms-1 gx-1 w-25">
                        <input type="text" className="form-control" id="floatingCvv" placeholder="Full Name" />
                        <label htmlFor="floatingCvv">Cvv</label>
                    </div>
                </div>
                <div className="p-3 bg-opacity-10 d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-secondary me-1">Cancel</button>
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    )
}