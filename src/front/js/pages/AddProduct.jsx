import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddProduct = () => {
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [pricing, setPricing] = useState('');
    const [stripeCode, setStripeCode] = useState('');
    const [weight, setWeight] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleCategory = (event) => setCategory(event.target.value)
    const handleName = (event) => setName(event.target.value)
    const handleDescription = (event) => setDescription(event.target.value)
    const handleStock = (event) => setStock(event.target.value)
    const handlePrice = (event) => setPricing(event.target.value)
    const handleWeight = (event) => setWeight(event.target.value)
    const handleStripeCode = (event) => setStripeCode(event.target.value)

    const subscribeable = false
    const productDetail = ''
    const image = ''
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.postProducts({name, description, productDetail, pricing, stripeCode, weight, stock, subscribeable, image, category })
    }

    const uploadFile = (e) => {
        e.preventDefault(); // stop website reload
        if (files) {
            // if there are any files to upload
            // call the action and pass the file
            actions.uploadFile(files[0]);
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);

        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    // Mirar la view de UploadImage para saber que falta.

    return (
        <div className="container mb-5">
            <h1 className="d-flex justify-content-center mt-4 text-dark">Agregar Producto</h1>
            <div className="container bg-primary-subtle rounded" style={{ width: '50%', height: '50%' }}>
                <form className="text-dark mt-3 p-2" onClick={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" onChange={handleName} value={name} id="name" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <select className="form-select" value={category} onChange={handleCategory} id="categoria" aria-label="Default select example">
                                <option>Seleccionar</option>
                                <option value="1">Pienso</option>
                                <option value="2">Snack</option>
                                <option value="3">Juguetes</option>
                                <option value="4">Accesorios</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripción" className="form-label mt-3">Descripción</label>
                        <input type="text" onChange={handleDescription} value={description} className="form-control" id="descripción" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="peso" className="form-label mt-3">Peso</label>
                        <input type="number" onChange={handleWeight} value={weight} className="form-control" id="peso" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stripe" className="form-label mt-3">Codigo de Stripe</label>
                        <input type="text" onChange={handleStripeCode} value={stripeCode} className="form-control" id="stripe" aria-describedby="emailHelp" />
                    </div>
                    <div className="container text-start">
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div className="col p-0">
                                <div className="mt-2 text-start me-3">
                                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                    <input type="number" onChange={handleStock} value={stock} className="form-control" id="cantidad" />
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="mt-2 text-start">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input type="number" onChange={handlePrice} value={pricing} className="form-control" id="precio" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="formFile" className="form-label">Imagen</label>
                        <input className="form-control" onChange={handleFileChange} type="file" id="formFile" />
                    </div>
                    <div className="p-3">{previewImage && (
                        <img className="img-thumbnail" src={previewImage} alt="Selected Image"
                            style={{ width: '50%', height: '50%' }} />)}
                    </div>
                    <div className="text-start ms-1 mt-3">
                        <div className="d-grid gap-2 d-md-block mb-3">
                            <button className="btn btn-primary me-2" type="submit">Crear</button>
                            <Link to="/" className="btn btn-secondary me-2">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}