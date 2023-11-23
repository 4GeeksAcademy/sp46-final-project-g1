import React from "react";
import { Link } from "react-router-dom";


export const CardOffers = () => {

    return (
            <div class="container text-center">
                <div class="row row-cols-1 row-cols-lg-2">
                    <div class="col">
                        <div class="p-3">
                            <div className="card">
                                <Link to="/">
                                    <img src="https://animal-home.es/img/cms/Snacks-para-perros.jpg"
                                        className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="p-3">
                            <div className="card">
                                <Link to="/">
                                    <img src="https://madagascarmascotas.com/modules/revsliderprestashop/uploads/BANNERS-BOLSAS-02.jpg"
                                        className="img-thumbnail" style={{ width: '650px', height: '275px' }} alt="..." />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}