import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from '@stripe/stripe-js';
/* import { useNavigate } from "react-router-dom"; */
/* import { Context } from "../store/appContext"; */


export const BotonPago = () => {
  /* const { store, actions } = useContext(Context); */
  /* const navigate = useNavigate() */
  const [ stripePublicKey, setStripePublicKey ] = useState();

  const getStripePublicKey = async () => {
    const url = `${process.env.BACKEND_URL}/stripe-key`
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setStripePublicKey( data.publicKey );
      return true
    } else {
      console.log('Error:', response.status, response.statusText);
      return false
    }
  };
  const processPayment = async () => {
    const postBills = await getActions().postBills();
    const stripe = await loadStripe(stripePublicKey);
    const url = `${process.env.BACKEND_URL}/payment`
    const token = localStorage.getItem("token")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    }
    console.log(options);
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setStore({ bill: data.results})
      console.log(data);
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  };


  useEffect(() => {
    async function setUpStripe() {
      // if (store.member.id) {
        await getStripePublicKey();
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
        <button className="btn btn-primary fw-bold text-dark w-100 " onClick={() => processPayment()}>
          Finalizar Compra
        </button>
      </div>
    </div>

  )
}

