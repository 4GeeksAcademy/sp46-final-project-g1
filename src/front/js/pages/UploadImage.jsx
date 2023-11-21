import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const UploadImage = () => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);


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

	const handleReset = () => {
		setFiles(null);
		setPreviewImage(null);
		window.location.reload(); // Estará bien?
	  };

	return (
		<div className="container d-flex text-center my-5">
			<div className="container text-center">
				<div className="row">
					<div className="col-4">
						<div className="p-3">
							<form>
								<input type="file" multiple onChange={handleFileChange} />
							</form>
						</div>
					</div>
					<div className="col-4">
						<div className="p-3">{previewImage && (
							<img className="img-thumbnail" src={previewImage} alt="Selected Image" />)}
						</div>
					</div>
					<div className="col-4">
						<button onClick={uploadFile} className="btn btn-primary me-2">Upload</button>
						<button onClick={handleReset} className="btn btn-secondary" type="reset">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
};