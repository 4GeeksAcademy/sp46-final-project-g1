import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const BotonPago = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

  useEffect(() => {
    async function setUpStripe() {
      // if (store.member.id) {
        await actions.getStripePublicKey()
      /* } else {
        navigate("/")
        alert("You are not a member")
      } */
    }

    setUpStripe()
  }, [])

  
  return (
    <div className="container">
      <div className="d-grid">
        <button className="btn btn-primary fw-bold text-dark w-100 " onClick={() => actions.processPayment()}>
          Finalizar Compra
        </button>
      </div>
    </div>

  )
}

