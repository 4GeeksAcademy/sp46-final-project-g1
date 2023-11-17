import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/scrollToTop";
// Import pages and component
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { BackendURL } from "./component/BackendURL.jsx";
import { Home } from "./pages/Home.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Form } from "./component/Form.jsx";
import { Product } from "./pages/Product.jsx";
import { Account } from "./pages/Account.jsx";
import { ShoppingCart } from "./pages/ShoppingCart.jsx";
import { Category } from "./pages/Category.jsx";

// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Form />} path="/form" />
                        <Route element={<Product />} path="/product" />
                        <Route element={<Account />} path="/account" />
                        <Route element={<ShoppingCart />} path="/shopping-cart" />
                        <Route element={<Category />} path="/category" />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};


export default injectContext(Layout);
