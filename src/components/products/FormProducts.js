import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	Link,
	useParams
} from 'react-router-dom';

import { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import Logger from '../../Utils/Logger';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormProducts = () => {
	const [val, setVal] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [type, setType] = useState("");

	const navigate = useNavigate();
	const [validationError, setValidationError] = useState({})
	const { id } = useParams();

	useEffect(() => {
		console.log(id);
		if (id != -1)
			getInfo();
	}, []);

	const getInfo = async () => {
		await axios.get(Logger.urlProductsFind(id)).then(({ data }) => {
			setName(data.info.name);
			setDescription(data.info.description);
			setPrice(data.info.price);
			setImage(data.info.image);
			setType(data.info.type);
		}).catch(({ response }) => {
			Swal.fire("Mensaje", "Error al realizar la peticion: " + response, "error");
		});
	}	

	//insert, update
	const processRequest = async (e) => {
		e.preventDefault();		
		const formData = new FormData(e.target)

		await axios.post(Logger.urlProductsStore(), formData)
			.then(({ data }) => {
				Swal.fire(
					"Confirmacion",
					data.message,
					data.code == 200 ? "success" : "error"
				).then(() => {
					navigate("/products");
				});
				console.log(data);
			}).catch(({ response }) => {
				if (response.status === 422)
					setValidationError(response.data.errors)
				else
					Swal.fire("Mensaje", "Error al realizar la peticion", "error");

			})
	}

	return (
		<div className='formProducts'>
			<Navbar />
			<h1>{val}</h1>

			<div className='d-flex justify-content-center mb-3'>
				<Link to={"/"} className='btn btn-success mt-3'><i class="bi bi-house"></i> Home</Link>
			</div>
			<div className='d-flex justify-content-center'>
				<form onSubmit={processRequest} id="form-products" >
					<input type={"hidden"} name="id" value={id} />
					<label>Producto: </label>
					<input type="text" name='name' value={name} onChange={ev => setName(ev.target.value)} className="form-control" required />
					<label>Description: </label>
					<input type="text" name="description" value={description} onChange={ev => setDescription(ev.target.value)} className="form-control" required />

					<label>Price: </label>
					<input type="number" name="price" value={price} onChange={ev => setPrice(ev.target.value)} className="form-control" required />
					<label>Image: </label>
					<input type="text" name="image" value={image} onChange={ev => setImage(ev.target.value)} className="form-control" required />
					<label>Type: </label>
					<select className='form-control' value={type} onChange={ev => setType(ev.target.value)} name='type'>
						<option>-- Ingrese una opcion --</option>
						<option value={"hombre"}>Hombre</option>
						<option value={"mujer"}>Mujer</option>
					</select>

					<button className='btn btn-success mt-5' type='submit'>{id != -1 ? 'Modificar' : 'Agregar'}</button>
				</form>
			</div>
		</div>
	)
}

export default FormProducts