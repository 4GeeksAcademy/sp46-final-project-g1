import React from "react";
import { Card } from "../component/Card.jsx";
import { ProductsOverFlow } from "../component/ProductsOverFlow.jsx";


export const Category = () => {

    return (
        <div className="mt-3 text-center">
            <div className="row">
                <div className="col-1 bg-danger">
                    <div className="d-flex justify-content-center">
                        <p>Productos</p>
                    </div>
                </div>
                <div className="col-11 bg-warning">
                    <div className="p-3">
                        <h4>Pienso</h4>
                        <div class="d-flex justify-content-evenly mt-3">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                        <div className="p-2">Flex item 2</div>
                        <div className="p-2">Flex item 3</div>
                    </div>
                </div>
            </div>
        </div>
    )
}