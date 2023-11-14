import React from "react";


export const Home = () => {

	return (
		<div id="carouselExampleIndicators" className="carousel slide">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src="https://kb.rspca.org.au/wp-content/uploads/2021/07/collie-beach-bokeh.jpg"
						className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="road trip dog" />
					<div className="carousel-caption d-flex align-items-start flex-column">
						<h4 className="text-dark"><strong>This line rendered as bold text</strong></h4>
						<p className="text-dark">Some representative placeholder content for the first slide.</p>
					</div>
				</div>
				<div className="carousel-item">
					<img src="https://assets-au-01.kc-usercontent.com/ab37095e-a9cb-025f-8a0d-c6d89400e446/fba30a1f-3490-4761-9f92-f28bf27e46ff/article-interpreting-body-language-in-dogs.jpg"
						className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="dog window" />
					<div className="carousel-caption d-none d-md-block">
						<h5>First slide label</h5>
						<p>Some representative placeholder content for the first slide.</p>
					</div>
				</div>
				<div className="carousel-item">
					<img src="https://naturesmiracle.la/cl/wp-content/uploads/sites/2/2020/12/iStock-1013878116-1-scaled.jpg"
						className="d-block w-100" style={{ height: "450px", objectFit: "cover" }} alt="dog park" />
					<div className="carousel-caption d-none d-md-block">
						<h5>First slide label</h5>
						<p>Some representative placeholder content for the first slide.</p>
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
	);
};
