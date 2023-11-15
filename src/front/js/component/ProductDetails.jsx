import React from "react";
import { QuantityButton } from "./QuantityButton.jsx";

export const ProductDetails = () => {

    return (
        <div class="container px-4 text-center">
            <div class="row gx-5">
                <div class="col">
                    <div id="carouselExampleIndicators" class="carousel slide p-3 carousel-dark">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw5bc9bb3c/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M.jpg?sw=528&sh=528"
                                    class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw72b754a0/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M%20(4).jpg?sw=528&sh=528"
                                    class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw3578efc8/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M%20(6).jpg?sw=528&sh=528"
                                    class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <div class="p-3 mt-3 text-dark">
                        <h3 className="text-start">Royal canin maxi adult pienso para perros</h3>
                        <p className="text-start mt-3">El alimento para perros Maxi Adult de ROYAL CANIN ha sido específicamente formulado teniendo en cuenta las necesidades nutricionales de tu perro. Este alimento es adecuado para perros de raza grande, a partir de los 15 meses y con un peso adulto de entre 26 y 44 kg.</p>
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <h5 className="text-start text-dark mb-3 fw-bold">Formato</h5>
                                <h5 className="text-start text-dark mb-3 fw-bold">Precio</h5>
                            </div>
                            <div className="container d-flex justify-content-between">
                                <div className="input">
                                    <div class="form-check d-flex justify-content-start">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label ms-2" for="flexRadioDefault1">
                                            Saco de 4 kg
                                        </label>
                                    </div>
                                    <div class="form-check d-flex justify-content-start">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label class="form-check-label ms-2" for="flexRadioDefault2">
                                            Saco de 15 kg
                                        </label>
                                    </div>
                                </div>
                                <div className="price">
                                    <p className="fw-semibold mb-0">22.00 €</p>
                                    <p className="fw-semibold">63.99 €</p>
                                </div>
                            </div>
                            <h5 className="text-start text-dark mb-3 fw-bold mt-4">Cantidad</h5>
                            <div className="row">
                                <div className="col-4">
                                    <QuantityButton />
                                </div>
                                <div className="col-8">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary" type="button">Añadir al carrito <i class="fas fa-shopping-cart"></i></button>
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
