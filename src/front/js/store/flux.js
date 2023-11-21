import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: {},
      user: {},
      products: [],
      categories: [],
      shoppingCarts: {},
      shoppingCartItems: {},
      currentItemCart: { quantity: 0 },
      bills: [],
      billsItems: [],
      offers: [],
      suscriptions: [],
      upload: [],
      reviews: [],
      favorites: [],
      stripePublicKey: '',
      message: null,
      demo: [{ title: "FIRST", background: "white", initial: "white" },
      { title: "SECOND", background: "white", initial: "white" }]
    },
    actions: {

      getUsers: async () => {
        const url = process.env.BACKEND_URL + "/api/users";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ users: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getProducts: async () => {
        const url = process.env.BACKEND_URL + "/api/products";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          console.log(detail);
          setStore({ products: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      postProducts: async () => {
        const url = process.env.BACKEND_URL + "/api/products";
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          console.log(detail);
          setStore({ products: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getCategories: async () => {
        const url = process.env.BACKEND_URL + "/api/categories";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ categories: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getShoppingcarts: async () => {
        const url = process.env.BACKEND_URL + "/api/shoppingcarts";
        const token = localStorage.getItem("token")
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ shoppingcarts: detail.cart });
          setStore({ shoppingCartItems: detail.items });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getMyShoppingcarts: async (shoppingCardId) => {
        const url = process.env.BACKEND_URL + "/api/shopping-carts/" + shoppingCardId;
        const token = localStorage.getItem("token")
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ shoppingcarts: detail.cart });
          setStore({ shoppingCartItems: detail.items });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      postShoppingCartItem: async (productID) => {
        const store = getStore();
        const url = process.env.BACKEND_URL + "/api/shopping-cart-items" + productID;
        const token = localStorage.getItem("token")
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(store.currentItemCart)
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ currentItemCart: {} })
          setStore({ currentItemCart: { quantity: 0 } })
          console.log(data);
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      deleteShoppingCartItem: async (userId, cartItemId) => {
        const url = process.env.BACKEND_URL + "/api/users/" + userId + "/shopping-cart-items/" + cartItemId;
        const token = localStorage.getItem("token")
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      putShoppingcarts: async () => {
        const store = getStore();
        const dataToSend = {quantity: store.currenItemCart.quantity}
        const userId = store.user.id
        const cartItemId = store.currenItemCart.id
        const url = process.env.BACKEND_URL + "/api/users/" + userId + "/shopping-cart-items/" + cartItemId;
        const token = localStorage.getItem("token");
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getbills: async () => {
        const url = process.env.BACKEND_URL + "/api/bills";
        const token = localStorage.getItem("token")
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ bills: detail });
          setStore({ billsItems: detail.items });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getMybills: async (userId) => {
        const url = process.env.BACKEND_URL + "/api/users/" + userId + "/bills";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ bills: detail });
          setStore({ billsItems: detail.items });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getOffers: async () => {
        const url = process.env.BACKEND_URL + "/api/offers";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ offers: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getSuscriptions: async () => {
        const url = process.env.BACKEND_URL + "/api/suscriptions";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ suscriptions: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getUpload: async () => {
        const url = process.env.BACKEND_URL + "/api/upload";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ upload: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getReviews: async () => {
        const url = process.env.BACKEND_URL + "/api/Reviews";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          setStore({ Reviews: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getStripePublicKey: async () => {
        const url = `${process.env.BACKEND_URL}/stripe-key`
        const options = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ stripePublicKey: data.publicKey });
          return true
        } else {
          console.log('Error:', response.status, response.statusText);
          return false
        }
      },
      processPayment: async () => {
        const stripe = await loadStripe(getStore().stripePublicKey)
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
          console.log(data);
          stripe.redirectToCheckout({ sessionId: data.sessionId });
        } else {
          console.log('Error:', response.status, response.statusText);
        }
      },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // Fetching data from the backend
          // const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
          // const data = await resp.json()
          // setStore({ message: data.message })
          // return data;  // Don't forget to return something, that is how the async resolves
        } catch (error) {
          // console.log("Error loading message from backend", error)
        }
      },
      changeColor: (index, color) => {
        const store = getStore();  // Get the store
        // We have to loop the entire demo array to look for the respective index and change its color
        const demo = store.demo.map((element, i) => {
          if (i === index) element.background = color;
          return element;
        });
        // Reset the global store
        setStore({ demo: demo });
      }
    }
  };
};


export default getState;
