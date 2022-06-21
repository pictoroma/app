import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './push';
import { useNotifications } from '#/hooks/notifications';

const STORAGE_KEY = '_/server';
type ServerContextValue = {
  domain?: string;
  pushToken: string | undefined;
  token?: string;
  logout: () => Promise<void>;
  login: (domain: string, username: string, secret: string) => Promise<void>;
  config?: {
    notifications: {
      push: boolean;
    };
  };
  acceptInvitation: (
    invitation: string,
    username: string,
    secret: string,
    name?: string
  ) => Promise<void>;
};

const ServerContext = createContext<ServerContextValue>(undefined as any);

const ServerProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<{ domain: string; token: string }>();
  const { show, dismiss } = useNotifications();
  const [config, setConfig] = useState<ServerContextValue['config']>();
  const [pushToken, setPushToken] = useState<string>();
  const [ready, setReady] = useState(false);
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setContext(undefined);
  }, [setContext]);

  useEffect(() => {
    if (!context || !config?.notifications.push) {
      return;
    }
    registerForPushNotificationsAsync().then(setPushToken);
  }, [context, config]);

  const login = useCallback(
    async (domain: string, username: string, secret: string) => {
      const authUrl = `${domain}/graphql`;
      const response = await fetch(authUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateAuthToken($secret: String!, $username: String!) {
              createAuthToken(secret: $secret, username: $username)
            } 
          `,
          variables: {
            username,
            secret,
          },
        }),
      });
      if (!response.ok) {
        show({
          type: 'error',
          text: await response.text(),
        });
        throw new Error('failed');
      }
      const json = await response.json();
      const context = {
        token: json.data.createAuthToken,
        domain,
      };
      setContext(context);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(context));
    },
    [show]
  );

  const acceptInvitation = useCallback(
    async (
      invitation: string,
      username: string,
      secret: string,
      name?: string
    ) => {
      const rawInvite = Buffer.from(invitation, 'base64').toString('utf-8');
      const { creationToken, domain } = JSON.parse(rawInvite);
      const authUrl = `${domain}/api/accept-invitation`;
      const response = await fetch(authUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          secret,
          creationToken,
          name,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const json = await response.json();
      const context = {
        token: json.token,
        domain,
      };
      setContext(context);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(context));
    },
    []
  );

  useEffect(() => {
    const run = async () => {
      const item = await AsyncStorage.getItem(STORAGE_KEY);
      if (item) {
        const nextContext = JSON.parse(item) as ServerContextValue;
        try {
          const configResponse = await fetch(
            `${nextContext.domain}/api/config`,
            {
              headers: {
                Authorization: `Bearer ${nextContext.token}`,
              },
            }
          );
          if (configResponse.ok) {
            setConfig(await configResponse.json());
            setContext(JSON.parse(item));
          } else {
            show({
              type: 'error',
              text: await configResponse.text(),
            });
          }
        } catch (err) {
          show({
            type: 'error',
            text: err.message,
          });
        }
      }
      setReady(true);
    };
    run().catch(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return <></>;
  }

  return (
    <ServerContext.Provider
      value={{ ...context, config, pushToken, logout, login, acceptInvitation }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ServerContext, ServerProvider };
