import React, { useContext, useState } from "react";
import { QuantityButton } from "./QuantityButton.jsx";
import { Context } from "../store/appContext.js";


export const CardShopping = (props) => {
    const { store, actions } = useContext(Context)
    const [quantity, setQuantity] = useState(1)
    const currentProduct = store.products.filter((product) => product.id == props.item.product_id)
    const handleQuantity = (event) => { setQuantity(event.target.value) }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        actions.updateQuantityItemCart(props.item.id, quantity);
        actions.putShoppingCarts();
    }
    const handleDelete = async () => {
        // actions.currentItems() // con el actions currentItemCart funciona el DELETE pero no actualizaa
        await actions.deleteShoppingCartItem(store.user.id, props.item.id)
    }


    return (
        <div className="container border border-primary rounded mb-2 p-3">
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-lg-3">
                    <div className="col col-lg-6">
                        <div className="p-3">
                            <img src={currentProduct[0].image_url}
                                className="card-img-top object-fit-fill" alt="Pienso" />
                        </div>
                    </div>
                    <div className="col col-lg-4 mt-5">
                        <div className="p-3 text-dark text-start">
                            <p className="m-0">{currentProduct[0].name}</p>
                            <p className="m-0">Cantidad: {props.item.quantity}</p>
                            <p className="m-0">Precio: {props.item.item_price}</p>
                        </div>
                        <form className="form ms-3" onSubmit={handleOnSubmit}>
                            <div className="form-outline d-flex" style={{ width: "22rem" }}>
                                <label className="form-label" htmlFor="typeNumber"></label>
                                <input min="1" max="100" type="number" id="typeNumber" className="form-control w-25"
                                    value={quantity} onChange={handleQuantity} />
                                <button type="submit" className="btn btn-primary ms-3">Modificar </button>
                            </div>
                        </form>
                    </div>
                    {/* <div className="col col-lg-4">
                        <div className="p-3 mt-5">
                            <QuantityButton />
                            genero un form con un input type:number y en el submit agregar un handleQuantity (en ese handle ir al put de)
                           
                            <form className="form" onSubmit={handleOnSubmit}>
                                <div className="form-outline" style={{ width: "22rem" }}>
                                    <label className="form-label" htmlFor="typeNumber"></label>
                                    <input min="1" max="100" type="number" id="typeNumber" className="form-control w-25"
                                        value={quantity} onChange={handleQuantity} />
                                </div>
                                <div className="form-outline">
                                    <button type="submit" className="btn btn-primary">Modificar </button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                    <div className="col col-lg-2">
                        <div className="p-3">
                            <div className="mt-5 text-start">
                                <button onClick={handleDelete} type="button" className="btn btn-light"><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}