import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";



export const StarReating = () => {
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    }
    

    const handleClick= (value) => {
        setCurrentValue(value)
    };

    const handleMouseOver = (value) => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };

    return (
        <div className="container d-flex justify-content-center">
            <div>
                {stars.map((_, index) => {
                    return (
                        <FaStar 
                        key={index}
                        size={17}
                        style={{
                            cursor: "pointer"
                        }}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
        </div>
    )
};
