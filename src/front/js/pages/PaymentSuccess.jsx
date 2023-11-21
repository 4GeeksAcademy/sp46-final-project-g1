import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {
    // Cambiar Bills.status a "Paid"
    useEffect(() => {
            // ejecuto el actions que hace el put para cambiar el status de la factura
            // para eso debo saber cual es el id de la factura que estan pagando
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className='py-5'>Thanks for your purchase!</h1>
            <div className="my-5 py-5">
                <Link to="/">
                    <button className="btn btn-warning">
                        Home
                    </button>
                </Link>
            </div>

        </div>
    )
}