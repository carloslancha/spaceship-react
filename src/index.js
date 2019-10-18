import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import App from './App';
import { GRAPHQL_ENDPOINT, USER_DATA } from './constants';

const apolloClient = new ApolloClient({
	headers: {
		'Authorization': `Basic ${btoa(`${USER_DATA.user}:${USER_DATA.password}`)}`
	},
	uri: GRAPHQL_ENDPOINT
});

/**
 * This is the main entry point of the portlet.
 *
 * See https://tinyurl.com/js-ext-portlet-entry-point for the most recent 
 * information on the signature of this function.
 *
 * @param  {Object} params a hash with values of interest to the portlet
 * @return {void}
 */
export default function main({portletNamespace, contextPath, portletElementId, configuration}) {
	ReactDOM.render(
		<ApolloProvider client={apolloClient}>
			<App />
		</ApolloProvider>,
		document.getElementById(portletElementId)
	);    
}