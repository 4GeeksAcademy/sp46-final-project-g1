import React, { useContext, useState } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ viewPassword, setViewPassword ] = useState(false);

  const navigate = useNavigate

  const handleEmail = (event) => setEmail(event.target.value)
  const handlePassword = event => setPassword(event.target.value)
  const handleViewPasswort = () => setViewPassword(!viewPassword)

  const login = async () => {
    const url = process.env.BACKEND_URL + "/api/login";
    const options = {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.token);
      store.user = data.results;
      setEmail('');
      setPassword('');
    } else {
      // tratar el error
      console.log('Error: ', response.status, response.statusText)
      return { Error: 'response error', status: response.status, statusText: response.statusText }
    }
  }
  
  // navigate('/')  // con el navigate ir a la pagina que quieras (home)
  
  return (
    <div className="container mt-4">
      <h1 className="text-center my-3">Login</h1>

      <form>
        <div className="form-floating mb-3">
          <input type="email" value={email} onChange={handleEmail} 
            className="form-control" id="exampleInputEmail1"  placeholder="Email address"
            aria-describedby="emailHelp" />
          <label htmlFor="exampleInputEmail1">Email address</label>
        </div>
        <div className="input-group mb-3">
          <div className="form-floating">
            <input type={viewPassword ? "text" : "password"} value={password} onChange={handlePassword}
              className="form-control" id="floatingInputGroup1" placeholder="Password" />
            <label htmlFor="floatingInputGroup1">Password</label>
          </div>
          <span className="input-group-text" onClick={handleViewPasswort}>
            {viewPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
          </span>
        </div>
        <button type="button" onClick={login} className="btn btn-primary me-4">Login</button>
        <button type="reset" className="btn btn-secondary">Cancel</button>
      </form>
    </div>

  )
};
