import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useContext, useMemo } from 'react';
import { ServerContext } from '../server';

const GraphQLProvider: React.FC = ({ children }) => {
  const { token, domain } = useContext(ServerContext);
  const apolloClient = useMemo(() => {
    const link = createHttpLink({
      uri: `${domain}/graphql`,
    });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: `bearer ${token}`,
        },
      };
    });
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(link),
    });
  }, [token, domain]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export { GraphQLProvider };
