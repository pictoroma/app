import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useContext, useMemo } from 'react';
import { ServerContext } from '../server';
import { ProfileProvider } from '../profile';
import { HomeProvider } from '../home';

const GraphQLProvider: React.FC = ({ children }) => {
  const { token, domain } = useContext(ServerContext);
  const apolloClient = useMemo(() => {
    if (!domain) {
      return undefined;
    }
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

  if (!apolloClient) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ProfileProvider>
        <HomeProvider>
          {children}
        </HomeProvider>
      </ProfileProvider>
    </ApolloProvider>
  );
};

export { GraphQLProvider };
