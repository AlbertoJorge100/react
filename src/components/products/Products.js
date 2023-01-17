import React, { createContext } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useNavigate
} from 'react-router-dom';


import { useState, useEffect } from 'react';
import Logger from '../../Utils/Logger';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import ModalProducts from './ModalProducts';

export const stateContext = createContext();

const Products = () => {
	const [show, setShow] = useState(false);	
	const [all, setAll] = useState([]);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const [filteredData, setFilteredData] = useState([]);
	const [id, setId] = useState(-1);
	const [title, setTitle] = useState("");
	
	const [state, setState] = useState(false);	
	
	const changestate = (flag) => {
		setState(flag);
	}
	
	//component lifecycle start
	useEffect(() => {
		fetchApi();
	}, []);

	useEffect(() => {
		const result = all.filter(data => {
			return data.name.toLowerCase().match(search.toLowerCase());
		});
		setFilteredData(result);
	}, [search]);

	const fetchApi = async () => {
		await axios.get(Logger.urlProductsAll())
			.then(({ data }) => {
				setAll(data);
				setFilteredData(data);
			}).catch(({ response }) => {
				if (response.status === 422)
					Swal.fire("Mensaje", "Error al realizar la peticion", "error");
				//setValidationError(response.data.errors)
				else
					Swal.fire("Mensaje", "Error al realizar la peticion", "error");
			})
	}

	const remove = async (id, _name) => {
		const confirm = await Swal.fire({
			title: 'Confirmación',
			text: `Desea eliminar el registro: "${_name}"?`,
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar'
		}).then((result) => {
			return result.isConfirmed;
		});

		if (!confirm) return;

		//just a status change ...
		await axios.get(Logger.urlProductsDelete(id)).then(({ data }) => {
			Swal.fire(
				"Confirmacion",
				data.message,
				data.code == 200 ? "success" : "error"
			).then(() => {
				//navigate("/products");
				fetchApi();
			});
		}).catch(({ response }) => {
			Swal.fire("Mensaje", "Error al realizar la peticion: " + response, "error");
		});
	}

	const columns = [
		{
			name: 'Name',
			selector: (row) => row.name
		},
		{
			name: 'Description',
			selector: (row) => row.description
		},
		{
			name: 'Price',
			selector: (row) => '$ ' + row.price
		},
		{
			name: 'Image',
			selector: (row) => <img src={row.image} width="50px" height="50px"/>
		},
		{
			name: 'Type',
			selector: (row) => row.type
		},
		{
			name: 'Actions',
			cell: (row) => 
			(<div>
				{/* <Link to={`form/${row.product_id}`} className='btn btn-success'>Editar</Link>				 */}
				<button className='btn btn-success' onClick={() => showModal(row.product_id, "Editar registro")}>Editar</button>
				&nbsp; <button className='btn btn-danger' onClick={() => remove(row.product_id, row.name)}>Eliminar</button>
			</div>
			),
		},

	];

	const showModal = (id, title) => {
		setId(id);
		setTitle(title);

		if(show)
			setShow(false);			
		else
			setShow(true);		
	}

	const updateAll = async () => {
		await fetchApi().then(() => {
			setState(false);
		});
	}

	if(state)
		updateAll();

	return (
		
		<div className='products'>
			<stateContext.Provider value={(flag) => changestate(flag)}>
			<Navbar />					
			{				
				show ? (<ModalProducts id = {id} title = {title}/>) : ''			
			}			
			
			<div className='container mt-5'>				
				<DataTable
					columns={columns}
					data={filteredData}
					title="Productos"
					pagination
					fixedHeader
					// selectableRows
					selectableRowsHighlight
					highlightOnHover
					actions={<button onClick={() =>  showModal(-1, "Crear registro")}  className='btn btn-primary'><i class="bi bi-file-earmark-plus"></i> Agregar</button>}
					// paginationComponentOptions={paginationOptions}
					subHeader
					subHeaderComponent={
						<input
							type="text"
							placeholder="busque aqui"
							className="w-25 form-control"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					}

				/>
			
				{/* <table className='table table-bordered table-striped table-responsive'>
					<thead>
						<tr>
							<th>Product</th>
							<th>Description</th>
							<th>Price</th>
							<th>Size</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							!all ? '... Loading' : all.map((element) => {
								return <tr>
									<td>{element.name} </td>
									<td>{Logger.trim_word(element.description)}</td>
									<td>$ {element.price}</td>
									<td>large</td>
									<td>
										<Link to={`form/${element.product_id}`} className='btn btn-success'><i class="bi bi-pencil-square"></i> Editar</Link>
										&nbsp;
										<button className='btn btn-danger' onClick={() => remove(element.product_id)}><i class="bi bi-trash-fill"></i> Eliminar</button>
									</td>
								</tr>
							})
						}
					</tbody>
				</table> */}
			</div>
			</stateContext.Provider>
		</div>

	)
}

export default Products
