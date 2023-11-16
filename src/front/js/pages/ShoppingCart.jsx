import React from "react";
import { CardShopping } from "../component/CardShopping.jsx";


export const ShoppingCart = () => {

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-8">
                    <CardShopping />
                </div>
                <div className="col-4">
                    <div class="d-flex flex-column mb-3 border rounded p-3">
                        <div class="p-2">Flex item 1</div>
                        <div class="p-2">Flex item 2</div>
                        <div class="p-2">Flex item 3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}