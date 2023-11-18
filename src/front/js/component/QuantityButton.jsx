import React, { useState } from "react";


export const QuantityButton = () => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1)
        }
    }

    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1)
        }
    }


    return (
        <div className="container">
            <div className="input-group border border-primary rounded">
                <button type="button" onClick={handleDecrement} className="input-group-text bg-primary-subtle">-</button>
                <div className="form-control text-center text-dark">{quantity}</div>
                <button type="button" onClick={handleIncrement} className="input-group-text bg-primary-subtle">+</button>
            </div>
        </div>
    )
}