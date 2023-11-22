import React from "react";
import { Link } from "react-router-dom";


export const CardCategory = () => {

    return (
        <div className="container mt-4">
            <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-xs-1 g-lg-3">
                <div className="col">
                    <div className="p-3">
                        <Link to="/category" className="text-decoration-none">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h3 className="text-center text-dark fw-semibold">Pienso</h3>
                                </div>
                                <div className="object-fit-contain mh-100" style={{ height: "270px" }}>
                                    <img src="https://i0.wp.com/alimentacionanimales.com/wp-content/uploads/2023/06/bodegon-sacos_GF_fish_OKggg-1.png?fit=1200%2C1100&ssl=1"
                                        className="card-img-top" style={{ objectFit: "cover", height: "200px" }} alt="pienso" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <Link to="/category" className="text-decoration-none">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h3 className="text-center text-dark fw-semibold">Snacks</h3>
                                </div>
                                <div className="object-fit-contain mh-100" style={{ height: "270px" }}>
                                    <img src="https://m.media-amazon.com/images/I/81WNQflfV1L.jpg"
                                        className="card-img-top" style={{ objectFit: "cover", height: "220px" }} alt="snack" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <Link to="/category" className="text-decoration-none">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h3 className="text-center text-dark fw-semibold">Juguetes</h3>
                                </div>
                                <div className="object-fit-contain mh-100" style={{ height: "270px" }}>
                                    <img src="https://gosygat.com/wp-content/uploads/2023/05/kong_optimized.air_.dog_.squeaker.bone_.gosygat.juguetes.perro-min-min.jpg"
                                        className="card-img-top" style={{ objectFit: "cover", height: "200px" }} alt="juguetes" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <Link to="/category" className="text-decoration-none">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h3 className="text-center text-dark fw-semibold">Accesorios</h3>
                                </div>
                                <div className="object-fit-contain mh-100" style={{ height: "270px" }}>
                                    <img src="https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw2d50e599/images/correa_perro_flexi_new_classic_compact_negro_FLE1200041_M.jpg?sw=780&sh=780&q=85"
                                        className="card-img-top" style={{ objectFit: "cover", height: "200px" }} alt="accesorios" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}