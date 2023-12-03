import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const AddProduct = () => {
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null);
    const [ previewImage, setPreviewImage ] = useState(null);


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
                <form className="text-dark mt-3 p-2">
                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="firstname" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Seleccionar</option>
                                <option value="1">Pienso</option>
                                <option value="2">Snack</option>
                                <option value="3">Juguetes</option>
                                <option value="3">Accesorios</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripción" className="form-label mt-3">Descripción</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="container text-start">
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div className="col p-0">
                                <div className="mt-2 text-start me-3">
                                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                    <input type="text" className="form-control" id="firstname" />
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="mt-2 text-start">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input type="text" className="form-control" id="identificationNumber" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-2">
                        <label for="formFile" class="form-label">Imagen</label>
                        <input class="form-control" onChange={handleFileChange} type="file" id="formFile" />
                    </div>
                    <div className="p-3">{previewImage && (
                        <img className="img-thumbnail" src={previewImage} alt="Selected Image" 
                        style={{ width: '50%', height: '50%' }} />)}
                    </div>
                    <div className="text-start ms-1 mt-3">
                        <div className="row row-cols-1 row-cols-lg-6">
                            <div className="col p-2 me-2">
                                <button type="submit" className="btn btn-primary">Crear</button>
                            </div>
                            <div className="col p-2">
                                <Link to="/" className="btn btn-secondary">
                                    Cancelar
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}