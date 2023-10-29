export * from './apollo-client/wrappers/auth';


// import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
// //import { useAuth } from '../../hooks';

// const APP_TOKEN  = 'app.token';
// const SERVER_URL = 'server.url';

// let uri = localStorage.getItem(SERVER_URL);
// if (uri){
// }
// uri = process.env.SERVER_URL;

// //uri = `${uri}/graphql`;
// uri = `http://localhost:8081/graphql`;

// console.log(uri)

// const wuri = uri.replace('http', 'ws');
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VybmFtZVRlc3QiLCJleHAiOjE2OTg4ODk3ODIsImlhdCI6MTY5ODAyNTc4MiwiYXV0aG9yaXRpZXMiOltdfQ.tk0AEtH5sgx-ltt0Ja7X93DR_89NnmdPg1l_DemsX5c';

// const authLink = new ApolloLink((operation, forward) => {
// 	//const token = localStorage.getItem(APP_TOKEN);
// 	//const { pbkdf2Key } = useAuth();

// 	operation.setContext({
// 		headers: {
// 			Authorization: token ? `Test 270881:mlsilva` : '',
// 		},
// 	});

// 	//console.log(`${pbkdf2Key}`);

// 	return forward(operation);
// });

// const httpLink = new HttpLink({
// 	uri,
// 	credentials: ``,
// });

// const wsLink = new WebSocketLink(
// 	new SubscriptionClient(wuri, {
// 		reconnect: true,
// 		connectionParams: {
// 			Authorization: token ? `Test 270881:mlsilva` : '',
// 		},
// 	})
// );

// const splitLink = split(
// 	({ query }) => {
// 		const definition = getMainDefinition(query);
// 		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
// 	},
// 	wsLink,
// 	authLink.concat(httpLink)
// );

// export const client = new ApolloClient({
// 	link: splitLink,
// 	cache: new InMemoryCache(),
// 	fetchOptions: {
//         mode: 'no-cors'
//     }
// });
