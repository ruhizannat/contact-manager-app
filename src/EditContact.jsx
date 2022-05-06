import ContactForm from './ContactForm';
import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ContactContext } from './context/ContactContext';

const EditContact = () => {
	const [contact, setContact] = useState(null);
	const { contacts, updateContact } = useContext(ContactContext);
	const navigate = useNavigate();
	const { id } = useParams();

	const contactToEdit = () => {
		const foundContact = contacts.find((contact) => contact.id === id);
		console.log(foundContact);
		if (!foundContact) {
			toast.error('contacts is not found to be updated');
			return navigate('/contacts');
		}

		setContact(foundContact);
	};

	useEffect(() => {
		contactToEdit();
	}, [id]);
	const handelUpdateContact = (contact) => {
		updateContact(contact);
	};
	return (
		<>
			<ContactForm updateContact={handelUpdateContact} contact={contact} />
			{/* <Button variant="secondary" className="ms-2" size='md'onClick={() =>navigate('/contacts')}>Back</Button> */}
		</>
	);
};
export default EditContact;
