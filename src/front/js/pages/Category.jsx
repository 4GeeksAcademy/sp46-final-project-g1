import React from "react";
import { Card } from "../component/Card.jsx";
import { ProductsOverFlow } from "../component/ProductsOverFlow.jsx";


export const Category = () => {

    return (
        <div className="container">
            <div className="pienso">
                <h1 className="text-center my-5">Pienso</h1>
                <div class="d-flex justify-content-center">
                    <ProductsOverFlow />
                </div>
            </div>
            <div className="snacks">
                <h1 className="text-center my-5">Snacks</h1>
                <div class="d-flex justify-content-center">
                    <ProductsOverFlow />
                </div>
            </div>
            <div className="juguetes">
                <h1 className="text-center my-5">Juguetes</h1>
                <div class="d-flex justify-content-center">
                    <ProductsOverFlow />
                </div>
            </div>
            <div className="accesorios mb-5">
                <h1 className="text-center my-5">Accesorios</h1>
                <div class="d-flex justify-content-center">
                    <ProductsOverFlow />
                </div>
            </div>
        </div>
    )
}