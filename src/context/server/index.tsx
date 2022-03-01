import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './push';

const STORAGE_KEY = '_/server';
type ServerContextValue = {
  domain?: string;
  pushToken: string | undefined;
  token?: string;
  logout: () => Promise<void>;
  login: (domain: string, username: string, secret: string) => Promise<void>;
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
  const [error, setError] = useState<any>();
  const [pushToken, setPushToken] = useState<string>();
  const [ready, setReady] = useState(false);
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setContext(undefined);
  }, [setContext]);

  useEffect(() => {
    if (!context) {
      return;
    }
    registerForPushNotificationsAsync().then(setPushToken);
  }, [context]);

  const login = useCallback(
    async (domain: string, username: string, secret: string) => {
      const authUrl = `${domain}/api/authorize`;
      const response = await fetch(authUrl, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          secret,
        }),
      });
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
      console.log(json);
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
        const configResponse = await fetch(`${nextContext.domain}/api/config`, {
          headers: {
            Authorization: `Bearer ${nextContext.token}`,
          },
        });
        if (configResponse.ok) {
          setContext(JSON.parse(item));
        }
      }
      setReady(true);
    };
    run().catch(err => {
      setReady(true);
      setError(err);
    });
  }, []);

  if (!ready) {
    return <></>;
  }

  return (
    <ServerContext.Provider
      value={{ ...context, pushToken, logout, login, acceptInvitation }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export { ServerContext, ServerProvider };
