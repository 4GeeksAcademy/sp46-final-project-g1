// import { loadStripe } from '@stripe/stripe-js';

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      user: {},
      products: [],
      product: {},
      categories: [],
      shoppingCarts: {},
      shoppingCartItems: [],
      currentItemCart: { quantity: 0 },
      bill: {},
      bills: [],
      billsItems: [],
      offers: [],
      suscriptions: [],
      upload: [],
      reviews: [],
      favorites: [],
      isLogin: false,
      stripePublicKey: '',
      message: null,
      demo: [{ title: "FIRST", background: "white", initial: "white" },
      { title: "SECOND", background: "white", initial: "white" }]
    },
    actions: {
      loginData: (data) => {
        setStore({user: data.results.user});
        setStore({shoppingCarts: data.results.cart});
        setStore({shoppingCartItems: data.results.item});
        // store.bills = 
        // store.billsItem =
        setStore({isLogin: true});
      },
      getUsers: async () => {
        const url = process.env.BACKEND_URL + "/api/users";
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
          setStore({ users: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getMyUsers: async (userId) => {
        const url = process.env.BACKEND_URL + "/api/users" + userId;
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
          setStore({ user: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      }, // falta el PUT
      putMyUsers: async () => {
        const store = getStore();
        const userId = store.user.id
        const dataToSend = {
          email: store.user.email,
          password: store.user.password,
          is_active: true,
          first_name: store.user.first_name,
          last_name: store.user.last_name,
          address: store.user.address,
          identification_number: store.user.identification_number,
          identification_type: store.user.identification_type,
          payment_method: store.user.payment_method
        }
        const url = process.env.BACKEND_URL + "/api/users" + userId;
        const token = localStorage.getItem("token")
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
          const detail = data.results;
          setStore({ user: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      }, // falta  el DELETE de "/api/users" + userId; (preguntar hector)
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
          setStore({ products: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      getOneProducts: async (productID) => {
        const url = process.env.BACKEND_URL + "/api/products" + productID;
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const detail = data.results;
          console.log(detail);
          setStore({ product: detail });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      postProducts: async () => {
        const url = process.env.BACKEND_URL + "/api/products";
        const token = localStorage.getItem("token")
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(store.products)
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
      }, // falta el PUT y DELETE de /products/<int:products_id>'
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
          headers: { "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
         }
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
          setStore({ bills: detail });
          setStore({ billsItems: detail.items });
        } else {
          console.log("ERROR:", response.status, response.statusText);
        }
      },
      postBills: async () => { // verificar con hector
        const store = getStore();
        const url = process.env.BACKEND_URL + "/api/bills";
        const token = localStorage.getItem("token")
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({})
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setStore({ shoppingCartItems: {} })
          setStore({ shoppingCarts: {}})
          console.log(data);
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
      uploadFile: async fileToUpload => {
				// const data = new FormData();
				// console.log("data", fileToUpload)
				// data.append("image", fileToUpload);
				// const url = "https://api.cloudinary.com/v1_1/ddpetmio/image/upload";
				// const options = {
				// 	method: 'POST',
				// 	body: data,
				// 	headers: {
				// 		Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
				// 		'Content-Type': 'application/json'
				// 	}
				// };
				// const response = await fetch(url, options);
				// if (response.ok) {
				// 	const data = await response.json();
				// 	console.log('URL de la imagen subida:', data.url);
				// } else {
				// 	const error = await response.json();
				// 	console.error('Error al subir la imagen:', error.message);
				//   };

				let data = new FormData();
				// console.log("data", fileToUpload);
				data.append("image", fileToUpload);

				// let response = fetch('https://api.cloudinary.com/v1_1/ddpetmio/image/upload', {
				// 	method: "POST",
				// 	body: data,
				// 	headers: {
				// 		Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
				// 	},
				// });
				const url = process.env.BACKEND_URL + '/api/upload';
				const options = {
					method: "POST",
					body: data,
					headers: {
						Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
					},
				};
        console.log(options)
				const response = await fetch(url, options)
				if (response.ok) {
					const data = await response.json();
					console.log(data)
					// Aqui 
				} else {
					console.log('error', response.status, response.text)
				}
			},
      /*       getStripePublicKey: async () => {
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
        const postBills = await getActions().postBills();
        const stripe = await loadStripe(getStore().stripePublicKey);
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
      }, */
      putBillPaid: async (billId) => {
        const dataToSend = {};
        const url = process.env.BACKEND_URL + "/api/bills/" + billId;
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
