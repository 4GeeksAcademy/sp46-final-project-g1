import React from "react";


export const Category = () => {

    return (
        <div className="container ms-0 mt-3 text-center">
            <div className="row">
                <div className="col-4 bg-danger">
                    <div className="d-flex justify-content-start">
                        <p>Productos</p>
                    </div>
                </div>
                <div className="col-8 bg-warning">
                    <div className="p-3">
                        <div className="d-flex flex-column mb-3">
                            <div className="p-2">Flex item 1</div>
                            <div className="p-2">Flex item 2</div>
                            <div className="p-2">Flex item 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}