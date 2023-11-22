import React from "react";


export const CondicionesDeEnvio = () => {

    return (
        <div className="container text-dark my-5">
            <h1 className="text-dark">Condiciones de envio</h1>
            <h5 className="text-dark mt-5">Costes de envio</h5>
            <p>Los costes de envío se calculan en función del peso y el tamaño del pedido, así como de la dirección de entrega. Los costes de envío se muestran en el carrito de la compra antes de realizar el pedido.</p>
            <h5 className="text-dark">Plazos de entrega</h5>
            <p>Los plazos de entrega varían en función de la ubicación del destinatario. En general, los pedidos se envían en un plazo de 24 a 48 horas después de la recepción del pago. </p>
            <h5 className="text-dark">Seguimiento de los pedidos</h5>
            <p>Una vez que se envía un pedido, recibirá un correo electrónico con un número de seguimiento. Puede utilizar este número para rastrear el estado de su pedido en línea.</p>
            <h5 className="text-dark">Entregas fallidas</h5>
            <p>Si no se encuentra en la dirección de entrega indicada cuando se intenta realizar la entrega, la empresa de mensajería le dejará un aviso. Puede ponerse en contacto con la empresa de mensajería para concertar una nueva entrega.</p>
        </div>
    )
};