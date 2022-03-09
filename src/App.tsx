import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './hooks/colors';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { GraphQLProvider } from './context/graphql';
import { ServerProvider } from './context/server';
import { light, dark } from '#/theme';
import { Router } from '#/router';
import { NotificationProvider } from './context/notifications';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={colorScheme === 'dark' ? dark : light}>
      <SafeAreaProvider>
        <NotificationProvider>
          <ServerProvider>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <GraphQLProvider>
              <Router colorScheme={colorScheme} />
            </GraphQLProvider>
          </ServerProvider>
        </NotificationProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
