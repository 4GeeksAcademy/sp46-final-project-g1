import React from "react";
import { Link } from "react-router-dom";


export const CardOffers = () => {

    return (
        <div className="container">
            <div className="row row-cols-sm2 row-cols-xs-1 g-lg-3">
                <div className="col px-0 me-5">
                    <div className="card">
                        <Link to="/">
                            <img src="https://animal-home.es/img/cms/Snacks-para-perros.jpg"
                                className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                        </Link>
                    </div>
                </div>
                <div className="col px-0">
                    <div className="card">
                        <Link to="/">
                            <img src="https://madagascarmascotas.com/modules/revsliderprestashop/uploads/BANNERS-BOLSAS-02.jpg"
                                className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}