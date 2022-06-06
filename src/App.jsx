import { Row, Col, Container, Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Contacts from './Contacts';
import Navigation from './Navigation';

import About from './About';
import Home from './Home';
import { useContext, useEffect, useState } from 'react';
import { contactsData } from './data';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import NotFound from './NotFound';
import ContactDetails from './ContactDetails';
import Register from './auth/Register';
import Login from './auth/Login';
import { AuthContext } from './context/AuthContext';
import AuthRequired from './routes/AuthRequired';
import PublicRoute from './routes/PublicRoute';

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
				<Navigation />
				<Col sm={{ span: 10, offset: 2 }}>
					<Container>
						<Routes>
							<Route path='/' index element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route
								path='/add'
								element={
									<AuthRequired>
										<AddContact />
									</AuthRequired>
								}
							/>
							<Route
								path='/edit/:id'
								element={
									<AuthRequired>
										<EditContact />
									</AuthRequired>
								}
							/>
							<Route path='/details/:id' element={<ContactDetails />} />
							<Route
								path='/contacts'
								element={
									<AuthRequired>
										<Contacts />
									</AuthRequired>
								}
							/>
							<Route
								path='/register'
								element={
									<PublicRoute>
										<Register />
									</PublicRoute>
								}
							/>
							<Route
								path='/login'
								element={
									<PublicRoute>
										<Login />
									</PublicRoute>
								}
							/>

							<Route path='*' element={<NotFound />} />
						</Routes>
					</Container>
				</Col>
			</Row>
		</>
	);
};
export default App;
