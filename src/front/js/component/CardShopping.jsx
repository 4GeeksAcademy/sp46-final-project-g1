import React, { useContext } from "react";
import { QuantityButton } from "./QuantityButton.jsx";
import { Context } from "../store/appContext.js";


export const CardShopping = (props) => {
    const { store, actions } = useContext(Context)

    const currentProduct = store.products.filter((product) => product.id == props.item.product_id )
    //const product = currentProduct[0]
    // const productId = product.id
    //const productName = product.name
    //const productUrl = product.image_url



    const handleDelete = async () => {
        // determinar el shoppingItemId y pasarlo como segundo parametro en el await
        const ShoppingCartItems = 0;
        console.log(store.shoppingCartItems[0]);
        await actions.deleteShoppingCartItem(store.user.id, props.item.id)
        // borrar del array via metodo filter el elemento que acabo de enviar y actualizar el store
        // TODO preguntar hector
    }

    return (
        <div className="container border border-primary rounded mb-2 p-3">
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-lg-3">
                    <div className="col col-lg-2">
                        <div className="p-3">
                            <img src={currentProduct[0].image_url}
                                className="card-img-top object-fit-fill" alt="Pienso" />
                        </div>
                    </div>
                    <div className="col col-lg-4">
                        <div className="p-3 text-dark text-start">
                            <p className="m-0">{currentProduct[0].name}</p>
                            <p className="m-0">Cantidad: {props.item.quantity}</p>
                            <p className="m-0">Precio: {props.item.item_price}</p>
                        </div>
                    </div>
                    <div className="col col-lg-4">
                        <div className="p-3 mt-5">
                            <QuantityButton />
                        </div>
                    </div>
                    <div className="col col-lg-2">
                        <div className="p-3">
                            <div className="mt-5 text-end">
                                <button onClick={handleDelete} type="button" className="btn btn-light"><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}