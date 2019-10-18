import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { GRAPHQL_ENDPOINT, USER_DATA } from './constants';

const apolloClient = new ApolloClient({
	headers: {
		'Authorization': `Basic ${btoa(`${USER_DATA.user}:${USER_DATA.password}`)}`
	},
	uri: GRAPHQL_ENDPOINT
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
