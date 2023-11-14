import React from "react";
import { Card } from "./Card.jsx"


export const ProductsOverFlow = () => {

    return (
        <div className="container">
            <h1 className="mb-3 mt-5 text-center ">Top products</h1>
            <div className="d-flex flex-nowrap position-relative overflow-auto m-3">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}