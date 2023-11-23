import React from "react";
import { Link } from "react-router-dom";


export const CardOffers = () => {

    return (
        <div className="container text-center">
            <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                    <div className="p-3">
                        <div className="card">
                            <img src="https://animal-home.es/img/cms/Snacks-para-perros.jpg"
                                className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <div className="card">
                                <img src="https://madagascarmascotas.com/modules/revsliderprestashop/uploads/BANNERS-BOLSAS-02.jpg"
                                    className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}