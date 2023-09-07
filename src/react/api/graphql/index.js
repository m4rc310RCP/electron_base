import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { useAuth } from '../../hooks';

let uri = process.env.SERVER_URL;
uri = `${uri}/graphql`;

const APP_TOKEN = 'app.token';

const wuri = uri.replace('http', 'ws');

const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(APP_TOKEN);
	const { pbkdf2Key } = useAuth();

	operation.setContext({
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	});

	console.log(`${pbkdf2Key}`);

	return forward(operation);
});

const httpLink = new HttpLink({
	uri,
	credentials: ``,
});

const wsLink = new WebSocketLink(
	new SubscriptionClient(wuri, {
		reconnect: true,
		connectionParams: {
			arguments: ``,
		},
	})
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	authLink.concat(httpLink)
);

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});
