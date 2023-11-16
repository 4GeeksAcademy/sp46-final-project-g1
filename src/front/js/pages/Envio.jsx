import React from "react";
import { Link } from "react-router-dom";

export const envio = () => {

    return (
        <div className="container">
            <h1>Condiciones de envio</h1>
            <h5>Costes de envio</h5>
            <p>Los costes de envío se calculan en función del peso y el tamaño del pedido, así como de la dirección de entrega. Los costes de envío se muestran en el carrito de la compra antes de realizar el pedido.</p>
            <div className="container">
            <h5>Plazos de entrega</h5>
            <p>Los plazos de entrega varían en función de la ubicación del destinatario. En general, los pedidos se envían en un plazo de 24 a 48 horas después de la recepción del pago. </p>
            </div>
            <div className="container">
            <h5>Seguimiento de los pedidos</h5>
            <p>Una vez que se envía un pedido, recibirá un correo electrónico con un número de seguimiento. Puede utilizar este número para rastrear el estado de su pedido en línea.</p>
            </div>
            <div className="container">
            <h5>Entregas fallidas</h5>
            <p>Si no se encuentra en la dirección de entrega indicada cuando se intenta realizar la entrega, la empresa de mensajería le dejará un aviso. Puede ponerse en contacto con la empresa de mensajería para concertar una nueva entrega.</p>
            </div>
            <div className="container">
            <h5>Devoluciones</h5>
            <p>Si no está satisfecho con su pedido, puede devolverlo dentro de los 14 días siguientes a la recepción. Para devolver un pedido, debe ponerse en contacto con el servicio de atención al cliente de WoofShop.</p>
            </div>

        </div>
        
        


    )
};