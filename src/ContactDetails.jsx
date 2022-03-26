import { Card, Button } from "react-bootstrap"
import style from './Contact.module.css'
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { format} from 'date-fns'



const defaultContact = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    dateOfBirth:'',
    gender: 'male',
    picture:'',


}
const ContactDetails = ({contacts}) =>{

    const [contact, setContact] = useState(defaultContact)
    const navigate = useNavigate()
   const {id} = useParams()
   console.log(id)

   const findContact = () =>{
     const foundContact =  contacts.find(contact => contact.id === id)
    
     console.log(foundContact)
     setContact(foundContact)
   }
    
    useEffect(() =>{
        findContact()
    }, [id])
 
    const { firstName, lastName, emailAddress, gender, dateOfBirth, picture} = contact
    return(
        <>
           <h1>Contact Details Information</h1>          

          <Card className={`mb-3 mt-3 ${style.contact}`}>
          <Card.Img variant="top" src={picture} />
            <Card.Body >
                
            <Card.Title>ID: {id}</Card.Title>
                <Card.Text>
                    <span className="text-dark">Name: {firstName} {lastName}</span><br />
                    <span>Email: {emailAddress}</span><br />
                    <span>Gender: {gender}</span><br />
                    <span>Date of Birth: {format(new Date(dateOfBirth),'dd/MM/yyyy')}</span><br />
                   
                </Card.Text>
                <div className="d-grid gap-2">
                <Button variant="outline-warning" className="ms-2" size='md'onClick={() =>navigate('/contacts')}><FaArrowLeft className="text-dark "/></Button>
                </div>
            </Card.Body>
            
            </Card>


        </>
    )
}
export default ContactDetails