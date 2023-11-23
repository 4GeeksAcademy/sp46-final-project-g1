import React from "react";
import { QuantityButton } from "./QuantityButton.jsx";
import { ProductsOverFlow } from "./ProductsOverFlow.jsx";
import { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";


export const ProductDetails = (props) => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    actions.getOneProducts(params.idProduct);


    const handleAddItem = async () => {
        store.currentItemCart = {
            item_price: props.product.pricing,
            shipping_item_price: 0,
            product_id: props.product.id
        }
        await actions.postShoppingCartItem()
    }

    return (
        <div className="container text-center">
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                    <div className="col">
                        <div className="p-3">
                            <div id="carouselExampleIndicators" className="carousel slide p-3 carousel-dark">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw5bc9bb3c/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M.jpg?sw=528&sh=528"
                                            className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw72b754a0/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M%20(4).jpg?sw=528&sh=528"
                                            className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw3578efc8/images/pienso_perros_royal_canin_maxi_adult_ROY153637_M%20(6).jpg?sw=528&sh=528"
                                            className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3">
                            <div className="container text-center">
                                <div className="row row-cols-1 row-cols-lg-1 g-2 g-lg-3">
                                    <div className="col">
                                        <div className="p-3">
                                            <div className="mt-3 text-dark">
                                                <h3 className="text-start">{store.product.name}</h3>
                                                <p className="text-start mt-3">{store.product.description}</p>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="text-start text-dark mb-3 fw-bold">Formato</h5>
                                                    <h5 className="text-start text-dark mb-3 fw-bold">Precio</h5>
                                                </div>
                                                <div className="container d-flex justify-content-between">
                                                    <p>Saco de {store.product.weight} kg</p>
                                                    <div className="price">
                                                        <p className="fw-semibold mb-0">{store.product.pricing} €</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="container text-center">
                                            <div className="row row-cols-1 row-cols-lg-2 g-lg-3">
                                                <div className="col">
                                                    <h5 className="text-start text-dark mb-3 fw-bold">Cantidad</h5>
                                                    <QuantityButton />
                                                </div>
                                                <div className="col">
                                                    <div className="p-3 mt-4">
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
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="mb-5">
                <h3 className="mb-5 text-center mt-5 fw-semibold text-dark">Te podría interesar...</h3>
                <ProductsOverFlow />
            </div>
        </div>
    )
}
