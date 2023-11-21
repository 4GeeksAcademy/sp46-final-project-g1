import React, { useContext } from "react";
import { QuantityButton } from "./QuantityButton.jsx";
import { Context } from "../store/appContext.js";


export const CardShopping = () => {
    const { store, actions } = useContext(Context)


    const handleDelete = async () => {
        // determinar el shoppingItemId y pasarlo como segundo parametro en el await
        const ShoppingCartItems = 0;
        await actions.deleteShoppingCartItem(store.user.id, store.ShoppingCartItems.id)
        // borrar del array via metodo filter el elemento que acabo de enviar y actualizar el store
    }

    return (
        <div className="container border border-primary rounded mb-2">
            <div className="row">
                <div className="col-2">
                    <div className="p-2">
                        <img src="https://www.dia.es/product_images/130332/130332_ISO_0_ES.jpg"
                            className="card-img-top object-fit-fill" alt="Pienso" />
                    </div>
                </div>
                <div className="col">
                    <div className="p-2 text-dark text-start">
                        <p className="m-0">Purina, friskies pienso para perros</p>
                        <p className="m-0">Cantidad: 1</p>
                        <p className="m-0">Peso: 12kg</p>
                        <p className="m-0">Precio: 30.00€</p>
                    </div>
                </div>
                <div className="col">
                    <div className="mx-4 mt-5">
                        <QuantityButton />
                    </div>
                </div>
                <div className="col">
                    <div className="mt-5 text-end">
                    <button onClick={handleDelete} type="button" className="btn btn-light"><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}