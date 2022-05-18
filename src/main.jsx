import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContactProvider } from './context/ContactContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ContactProvider>
				<App />
			</ContactProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
