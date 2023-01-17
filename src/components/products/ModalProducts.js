import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	Link,
	useParams
} from 'react-router-dom';
import Logger from '../../Utils/Logger';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserContext, useToggleContext } from '../../providers/UserProviders';
import { stateContext } from './Products';

const ModalProducts = (props) => {
    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [type, setType] = useState("");
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();	
	// const { id } = useParams();
    const id = props.id;

    const user = useUserContext();
    const us = useToggleContext();
    const state = useContext(stateContext);

    useEffect(() => {
        if(id != -1)
            getInfo();
    }, []);

    const getInfo = async () => {
        await axios.get(Logger.urlProductsFind(id)).then(({data}) => {
            setName(data.info.name);
            setDescription(data.info.description);
            setPrice(data.info.price);
            setImage(data.info.image);
            setType(data.info.type);
        }).catch(({error}) => {
            Swal.fire('Mensaje', 'error: ' + error, 'error');
        });
    }

    const processRequest = async (e) => {
        e.preventDefault();
        if(!e.target.checkValidity()){
            e.target.classList.add("was-validated");
            return;
        }        
        
        await axios.post(Logger.urlProductsStore(), new FormData(e.target)).then(({data}) => {
            Swal.fire(
                "Confirmacion",
                data.message,
                data.code == 200 ? "success" : "error"
            );
            console.log(data);
            state(true);
            handleClose();            
        }).catch(({error}) => {
            console.log(error);
        });
    }

    return (
        <>
          {/* <button className='btn btn-primary' onClick={handleShow}>
            Launch demo modal
          </button> */}
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.title} - {user.user} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="form-products" onSubmit={processRequest}>
                    <input type={"hidden"} name="id" value={id} />
                    <label>Producto: </label>
                    <input type="text" name='name' value={name} onChange={(ev) => setName(ev.target.value)} className="form-control" required />
                    <label>Description: </label>
                    <input type="text" name="description" value={description} onChange={(ev) => setDescription(ev.target.value)} className="form-control" required />
                    <label>Price: </label>
                    <input type="number" name="price" value={price} onChange={(ev) => setPrice(ev.target.value)} className="form-control" required />
                    <label>Image: </label>
                    <input type="text" name="image" value={image} onChange={(ev) => setImage(ev.target.value)} className="form-control" required />                
                    <label>Type: </label>
                    <select className='form-control' value={type} onChange={(ev) => setType(ev.target.value)} name='type' required>
                        <option value = "">-- Ingrese una opcion --</option>
                        <option value={"hombre"}>Hombre</option>
                        <option value={"mujer"}>Mujer</option>
                    </select>
                    
                    <div className='mt-3'>
                        <button className='btn btn-success' type='submit' formNoValidate>{id != -1 ? 'Modificar' : 'Agregar'}</button>					
                        &nbsp;
                        <button className='btn btn-danger' onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <button className='btn btn-danger' onClick={handleClose}>
                    Close
                </button>
               <button className='btn btn-success' onClick={handleClose}>
                Save Changes
              </button> 
            </Modal.Footer> */}
          </Modal>
        </>
      );    
}

export default ModalProducts