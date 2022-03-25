import { Card, Button } from "react-bootstrap"
import style from './Contact.module.css'
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const ContactDetails = ({contact}) =>{
    const {id, firstName, lastName, emailAddress, gender, dateOfBirth} = contact
    return(
        <>

          
{/* 
          <Card className={`mb-3 mt-3 ${style.contact}`}>

            <Card.Body >
                
                <Card.Title>ID: {contact.id}</Card.Title>
                <Card.Text>
                    <span className="text-dark">Name: {contact.firstName} {contact.lastName}</span><br />
                    <span>Email: {contact.emailAddress}</span><br />
                    <span>Gender: {contact.gender}</span><br />
                    <span>Date of Birth: {contact.dateOfBirth}</span><br />
                    <Button variant="info" size='md' type='edit'><FaRegEdit /></Button>
                    <Button variant="danger ms-3" size='md' type='delete'><FaRegTrashAlt /></Button>
                </Card.Text>
                
            </Card.Body>
            </Card> */}

        </>
    )
}
export default ContactDetails