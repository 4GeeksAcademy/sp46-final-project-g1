import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const ShoppingCartList = (props) => {
    const { store, actions } = useContext(Context)
    const currentProduct = store.products.filter((product) => product.id == props.item.product_id )


    return (
        <div className="d-flex justify-content-between mt-3">
            <div className="text-dark">
                <p className="m-0">{currentProduct[0].name}</p>
            </div>
            <div className="text-dark">
                <p className="m-0">{props.item.item_price} €</p>
            </div>
        </div>

    )
}