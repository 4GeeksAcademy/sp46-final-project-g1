import React from "react";
import { Card } from "./Card.jsx"


export const ProductsOverFlow = () => {

    return (
        <div className="container">
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