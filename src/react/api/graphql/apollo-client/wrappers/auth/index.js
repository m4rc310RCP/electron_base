import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../index';

const uri = 'https://home.m4rc310.com.br/graphql';
const type_token = 'Test';
const token = 'mlsilva:270881';

export const ApolloAuthWrapper = ({children}) => {
	return <ApolloProvider client={client(uri, type_token, token)}>{children}</ApolloProvider>;
};

