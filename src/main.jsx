import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContactProvider } from './context/ContactContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ContactProvider>
					<App />
				</ContactProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
