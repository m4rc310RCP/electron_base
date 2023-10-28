import React from 'react';
import { split, HttpLink, ApolloClient, InMemoryCache, concat, ApolloLink, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

let uri = 'http://localhost:8081/graphql';
let wsuri = uri.replace('http', 'ws');

export const ApolloWrapper = ({ children }) => {
	const httpLink = new HttpLink({
		uri: { uri },
	});

	const wsLink = new WebSocketLink(
		new SubscriptionClient(wsuri, {
			reconnect: true,
			connectionParams: {
				Authorization: `Test 270881:mlsilva`,
			},
		})
	);

	const authMiddleware = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				Authorization: `Test 270881:mlsilva`,
			},
		});
		return forward(operation);
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
		},
		wsLink,
		httpLink
	);

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link: concat(authMiddleware, splitLink),
		fetchOptions: {
			mode: 'no-cors',
		},
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

