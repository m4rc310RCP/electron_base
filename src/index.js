import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MStatusBarProvider, AuthProvider } from './react/context';

//import  clienhooks  from './react/api/graphql/apollo-client/apollo-client-v2';
import { ApolloWrapper } from './react/api/graphql/apollo-client/apollo-client-v3';

import App from './react/AppV2';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<StrictMode>
		<ApolloWrapper>
		<AuthProvider>
				<MStatusBarProvider>
					<App />
				</MStatusBarProvider>
		</AuthProvider>
		</ApolloWrapper>
	</StrictMode>
);
