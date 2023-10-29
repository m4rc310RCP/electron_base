import React from 'react';

import { split, HttpLink, ApolloClient, InMemoryCache, concat, ApolloLink, ApolloProvider } from '@apollo/client';

import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

export const httpLink = (uri) =>
	new HttpLink({
		uri: { uri },
	});

export const wsLink = (wsuri, type_token, token) =>
	new WebSocketLink(
		new SubscriptionClient(wsuri, {
			reconnect: true,
			connectionParams: {
				Authorization: token ? `${type_token} ${token}` : '',
			},
		})
	);

export const authMiddleware = (type_token, token) =>
	new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				Authorization: token ? `${type_token} ${token}` : '',
			},
		});
		return forward(operation);
	});

export const splitLink = (uri, type_token, token) =>
	split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
		},
		wsLink(uri, type_token, token),
		httpLink(uri.replace('http', 'ws'), type_token, token)
	);

export const client = (uri, type_token, token) =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: concat(authMiddleware(type_token, token), splitLink(uri, type_token, token)),
		fetchOptions: {
			mode: 'no-cors',
		},
	});
