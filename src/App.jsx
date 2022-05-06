import { Row, Col, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Contacts from './Contacts';
import Navigation from './Navigation';

import About from './About';
import Home from './Home';
import { useEffect, useState } from 'react';
import { contactsData } from './data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import ContactDetails from './ContactDetails';

const App = () => {
	return (
		<>
			<ToastContainer
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
			/>
			<Row>
				<BrowserRouter>
					<Navigation />
					<Col sm={{ span: 10, offset: 2 }}>
						<Container>
							<Routes>
								<Route path='/' index element={<Home />} />
								<Route path='/about' element={<About />} />
								<Route path='/add' element={<AddContact />} />
								<Route path='/edit/:id' element={<EditContact />} />
								<Route path='/details/:id' element={<ContactDetails />} />
								<Route path='/contacts' element={<Contacts />} />

								<Route path='*' element={<NotFound />} />
							</Routes>
						</Container>
					</Col>
				</BrowserRouter>
			</Row>
		</>
	);
};
export default App;
