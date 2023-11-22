import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  
  return (
    <div className="container-fluid bg-light">
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-4 mb-3">
              <h5>Desarrolladores</h5>
              {/* icono de github y linkedin (con anchor) y mentor */}
              <ul className="list-unstyled d-flex">
              <li className="ms-3">Luis Medina
              <a className="link-body-emphasis ms-2" href="https://github.com/lgmedina23" target="_blank"><i className="fa-brands fa-github text-dark"></i></a>
              <a className="link-body-emphasis ms-2" href="https://www.linkedin.com/in/luis-guillermo-medina-71b273b1/" target="_blank"><i className="fa-brands fa-linkedin "></i></a>
              </li>
            </ul>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">Mathew Woo
              <a className="link-body-emphasis ms-2" href="https://github.com/MatWoov" target="_blank"><i className="fa-brands fa-github text-dark"></i></a>
              <a className="link-body-emphasis ms-2" href="https://www.linkedin.com/in/mathew-woo-35024a13a/" target="_blank"><i className="fa-brands fa-linkedin "></i></a>
              </li>
            </ul>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">Gabriel Montaño
              <a className="link-body-emphasis ms-2" href="https://github.com/GabrielM20-1" target="_blank"><i className="fa-brands fa-github text-dark"></i></a>
              <a className="link-body-emphasis ms-2" href="https://www.linkedin.com/in/gabriel-monta%C3%B1o-valero-742605264/" target="_blank"><i className="fa-brands fa-linkedin "></i></a>
              </li>
            </ul>
              <h5>Mentor</h5>
              <ul className="list-unstyled d-flex">
              <li className="ms-3">Héctor Chocobar Torrejón
              <a className="link-body-emphasis ms-2" href="https://github.com/hchocobar" target="_blank"><i className="fa-brands fa-github text-dark "></i></a>
              <a className="link-body-emphasis ms-2" href="https://www.linkedin.com/in/hector-chocobar/" target="_blank"><i className="fa-brands fa-linkedin "></i></a>
              </li>
            </ul>
            </div>

            <div className="col-6 col-md-4 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><Link to="/Faqs" className="nav-link p-0 text-body-secondary">FAQs</Link></li> 
                {/* #texto modelo para unas vistas */}
                <li className="nav-item mb-2"><Link to="/Disclaimer" className="nav-link p-0 text-body-secondary">Disclaimer</Link></li>
                <li className="nav-item mb-2"><Link to="/Privacidad" className="nav-link p-0 text-body-secondary">Política de privacidad</Link></li>
                <li className="nav-item mb-2"><Link to="/Uso" className="nav-link p-0 text-body-secondary">Condiciones de uso</Link></li>
                <li className="nav-item mb-2"><Link to="/Envio" className="nav-link p-0 text-body-secondary">Condiciones de envio</Link></li>
              </ul>
            </div>
            <div className="col-md-3 offset-md-1 mb-3">
              <form>
                <h5>Newsletter</h5>
                
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                  <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2023 Woofshop. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3"><Link className="link-body-emphasis" to="#"><i className="fa-brands fa-facebook fa-lg"></i></Link></li>
              <li className="ms-3"><Link className="link-body-emphasis" to="#"><i className="fa-brands fa-github fa-lg"></i></Link></li>
              <li className="ms-3"><Link className="link-body-emphasis" to="#"><i className="fa-brands fa-linkedin fa-lg"></i></Link></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};