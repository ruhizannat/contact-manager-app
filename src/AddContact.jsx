import ContactForm from './ContactForm';

const AddContact = ({ addContact }) => {
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
