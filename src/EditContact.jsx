import ContactForm from './ContactForm';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditContact = ({ contacts, updateContact }) => {
	const [contact, setContact] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();
	console.log(id);

	const contactToEdit = () => {
		const foundContact = contacts.find((contact) => contact.id === id);
		if (!foundContact) {
			toast.error('contacts is not found to be updated');
			return navigate('/contacts');
		}
		console.log(foundContact);
		setContact(foundContact);
	};

	useEffect(() => {
		contactToEdit();
	}, [id]);
	const handelUpdateContact = (contact) => {
        console.log(contact)
        updateContact(contact)
    };
	return (
		<>
			<ContactForm updateContact={handelUpdateContact} contact={contact} />
		</>
	);
};
export default EditContact;
