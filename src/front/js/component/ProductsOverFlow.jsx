import React, { useContext } from "react";
import { Card } from "./Card.jsx"
import { Context } from "../store/appContext.js";



export const ProductsOverFlow = () => {
    const { store, actions } = useContext(Context);

    return (
        <div class="container text-center">
            <div class="row row-cols-1 row-cols-lg-5 g-2 g-lg-3">
                {store.products.slice(0, 5).map((product) => (
                    <div class="col">
                        <div class="p-3">
                            <Card key={product.id} product={product} />
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="container d-flex justify-content-center">
                <div className="d-flex">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div> */}
        </div>
    )
}