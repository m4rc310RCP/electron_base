import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './react/app';
import { MRegisterProvider } from './react/context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<MRegisterProvider>
			<App />
		</MRegisterProvider>
	</StrictMode>
);
