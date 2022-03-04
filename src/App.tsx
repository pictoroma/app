import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './hooks/colors';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { GraphQLProvider } from './context/graphql';
import { ServerProvider } from './context/server';
import { light, dark } from '#/theme';
import { Router } from '#/router';
import { ProfileProvider } from './context/profile';
import { NotificationProvider } from './context/notifications';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={colorScheme === 'dark' ? dark : light}>
      <SafeAreaProvider>
        <ServerProvider>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <GraphQLProvider>
            <NotificationProvider>
              <ProfileProvider>
                <Router colorScheme={colorScheme} />
              </ProfileProvider>
            </NotificationProvider>
          </GraphQLProvider>
        </ServerProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
