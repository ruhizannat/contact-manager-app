import ContactForm from './ContactForm';
import { ContactContext } from './context/ContactContext';
import { useContext } from 'react';

const AddContact = () => {
	const { addContact } = useContext(ContactContext);
	const handelContact = (contact) => {
		console.log(contact);
		addContact(contact);
		// adding contact
	};
	return (
		<>
			<ContactForm addContact={handelContact} />
		</>
	);
};
export default AddContact;
