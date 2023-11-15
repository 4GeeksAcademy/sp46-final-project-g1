import React from "react";
import { Card } from "./Card.jsx"


export const ProductsOverFlow = () => {

    return (
        <div className="container">
            <h1 className="mb-2 text-center mt-5">Top productos</h1>
            <div className="container d-flex justify-content-center">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}