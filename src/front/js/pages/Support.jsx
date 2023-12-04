import React from "react";
import { Link } from "react-router-dom";

export const Support = () => {

    return (
        <div className="container text-center">
            <div className="row row-cols-1 row-cols-lg-1">
                <div className="col mt-4">
                    <div className="p-3">
                        <h2 className="text-dark">¿Tienes alguna duda? ¡Aquí te ayudamos!</h2>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 text-center text-dark">
                        <p className="m-0">¿Quieres saber más información sobre un producto de nuestra tienda o tienes alguna duda?</p>
                        <p className="m-0">Completa el formulario de abajo para ponernos en contacto con usted.</p>
                    </div>
                </div>
                <div className="col col-lg-6 container bg-primary-subtle rounded mb-5">
                    <form>
                        <div className="p-3 text-dark text-start">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">¿Qué duda tienes?</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="d-grid gap-2 d-md-block">
                                <button className="btn btn-primary me-2" type="submit">Enviar</button>
                                <Link to="/" className="btn btn-secondary me-2">Cancelar</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}