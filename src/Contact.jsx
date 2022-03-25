import { Card, Button, Modal } from "react-bootstrap"
import style from './Contact.module.css'
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";





const Contact = ({contact, deleteContact})=>{
    const {id, firstName, lastName, emailAddress, gender, dateOfBirth} = contact
  
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClose = (evt) =>{
        if(evt.target.dataset.action === 'delete'){
            deleteContact(id)
            toast.success('Contact is deleted is Successfully')
        }
        setShow(false)
    } 
    const handleShow = () => setShow(true);
  

    const modal =<Modal show={show} onHide={handleClose}>

        <Modal.Body>Are you sure, you want to delete the contact?</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" data-action='delete' onClick={handleClose}>
        Delete
        </Button>
        <Button variant="info" onClick={handleClose}>
          Cancel
        </Button>
        </Modal.Footer>
        </Modal>
    return(
        <>

         {modal}

          <Card className={`mb-3 mt-3 ${style.contact}`}>

            <Card.Body >
                
                <Card.Title>ID: {id}</Card.Title>
                <Card.Text>
                    <span className="text-dark">Name: {firstName} {lastName}</span><br />
                    <span>Email: {emailAddress}</span><br />
                    <span>Gender: {gender}</span><br />
                    <span>Date of Birth: {dateOfBirth}</span><br />
                    <Button variant="info" size='md' type='edit'onClick={() => navigate(`/edit/${id}`)}><FaRegEdit /></Button>
                    <Button variant="danger ms-3" size='md' type='delete' onClick={handleShow}><FaRegTrashAlt /></Button>
                </Card.Text>
                
            </Card.Body>
            </Card>

        </>
    )
}
export default Contact