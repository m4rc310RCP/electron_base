import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, MClockProvider } from './react/context';
import { client } from './react/api';

import App from './react/App.js';
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<AuthProvider>
			<MClockProvider>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</MClockProvider>
		</AuthProvider>
	</StrictMode>
);
