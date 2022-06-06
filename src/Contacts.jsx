import Contact from './Contact';
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { ContactContext } from './context/ContactContext';

const Contacts = () => {
	const { contacts } = useContext(ContactContext);

	const [search, setSearch] = useState('');

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.firstName.includes(search) || contact.lastName.includes(search)
	);

	return (
		<>
			<h1 className='mt-1 mb-3 text-center'>All Contacts</h1>
			<Form as={Row} className='d-flex mb-5'>
				<Col sm={4}>
					<FormControl
						type='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Search'
						className='me-2'
						aria-label='Search'
					/>
				</Col>
				<Col sm={2}>
					<Button variant='outline-success'>Search</Button>
				</Col>
			</Form>

			<Row>
				{filteredContacts.map((contact, i) => (
					<Col sm={4} key={i}>
						<Contact contact={contact} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default Contacts;
