import React from "react";
import { Card } from "./Card.jsx"


export const ProductsOverFlow = () => {

    return (
        <div className="container">
            <div class="container">
                <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    <div class="col">
                        <div>
                            <Card />
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <Card />
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <Card />
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <Card />
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <Card />
                        </div>
                    </div>
                </div>
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