import React from "react";
import { Link } from "react-router-dom";
import { ProductsOverFlow } from "../component/ProductsOverFlow.jsx";
import { CardOffers } from "../component/CardOffers.jsx";
import { CardCategory } from "../component/CardCategory.jsx";


export const Home = () => {

	return (
		<div className="body">
			<div id="carouselExampleIndicators" className="carousel slide">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="https://kb.rspca.org.au/wp-content/uploads/2021/07/collie-beach-bokeh.jpg"
							className="d-block w-100 object-fit-cover" style={{ height: "450px" }} alt="road trip dog" />
						<div className="carousel-caption d-flex align-items-start flex-column">
							<h4 className="text-dark"><strong>Bienvenido! Aquí encontrarás<br />los mejores productos para tu mejor amigo</strong></h4>
							<Link to="/" className="btn btn-danger"><i className="fas fa-paw me-2"></i>Productos</Link>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://assets-au-01.kc-usercontent.com/ab37095e-a9cb-025f-8a0d-c6d89400e446/fba30a1f-3490-4761-9f92-f28bf27e46ff/article-interpreting-body-language-in-dogs.jpg"
							className="d-block w-100 object-fit-cover" style={{ height: "450px" }} alt="dog window" />
						<div className="carousel-caption d-flex align-items-start flex-column">
							<h4 className="text-light"><strong>Woof! Woof! Ya te registraste?</strong></h4>
							<Link to="/" className="btn btn-danger"><i className="fas fa-user me-2"></i>Iniciar sesión</Link>
						</div>
					</div>
					<div className="carousel-item">
						<img src="https://naturesmiracle.la/cl/wp-content/uploads/sites/2/2020/12/iStock-1013878116-1-scaled.jpg"
							className="d-block w-100 object-fit-cover" style={{ height: "450px" }} alt="dog park" />
						<div className="carousel-caption d-flex align-items-start flex-column">
							<h4 className="text-light"><strong>Estoy oliendo algo sabroso! <br />Mira todos nuestros productos</strong></h4>
							<Link to="/category" className="btn btn-danger"><i className="fas fa-bone fa-spin me-2"></i>Categorías</Link>
						</div>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<div className="container d-flex align-items-center flex-column mb-3">
				<h1 className="mb-2 text-center mb-4 mt-4 fw-semibold text-dark">Top productos</h1>
				<ProductsOverFlow />
			</div>
			<div className="container">
				<h1 className="text-center fw-semibold text-dark my-4">Ofertas 🔥</h1>
				<CardOffers />
			</div>
			<div className="container mb-5">
				<h1 className="text-center my-4 fw-semibold text-dark">Categorías</h1>
				<CardCategory />
			</div>
		</div>
	);
};
