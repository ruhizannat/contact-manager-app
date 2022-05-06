import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContactProvider } from './context/ContactContext';

ReactDOM.render(
	<React.StrictMode>
		<ContactProvider>
			<App />
		</ContactProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
