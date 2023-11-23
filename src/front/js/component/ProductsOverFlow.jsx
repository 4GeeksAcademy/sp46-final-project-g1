import React, { useContext } from "react";
import { Card } from "./Card.jsx"
import { Context } from "../store/appContext.js";



export const ProductsOverFlow = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center">
            <div className="row row-cols-lg-7 row-cols-sm-2 row-cols-xs-2 row-cols-xl-5">
                {store.products.slice(0, 5).map((product) => (
                    <div className="col col-lg-4">
                        <div className="p-3">
                            <Card key={product.id} product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}