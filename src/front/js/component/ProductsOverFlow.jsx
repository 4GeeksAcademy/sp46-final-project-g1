import React, { useContext } from "react";
import { Card } from "./Card.jsx"
import { Context } from "../store/appContext.js";



export const ProductsOverFlow = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="container d-flex justify-content-center">
                {store.products.map((product) =>
                    <Card key={product.id} product={product} />
                )}
            </div>
        </div>
    )
}