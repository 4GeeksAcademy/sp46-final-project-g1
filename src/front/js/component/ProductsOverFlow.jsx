import React, { useContext } from "react";
import { Card } from "./Card.jsx"
import { Context } from "../store/appContext.js";



export const ProductsOverFlow = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center">
            <div className="row row-cols-lg-5 row-cols-sm-2 row-cols-xs-2 g-lg-3">
                {store.products.slice(0, 5).map((product) => (
                    <div className="col">
                        <div className="p-3">
                            <Card key={product.id} product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}