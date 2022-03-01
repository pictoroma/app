import React, { useContext, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { ProfileParamList, RootStackParamList, TabParamList } from './types';
import { linkingConfig } from './linking';
import { Icon, PushRegistation } from '#/components';

import { AddPostScreen } from '#/screens/posts/add';
import { FeedScreen } from '#/screens/posts/feed';
import { ProfileScreen } from '#/screens/profile';
import { FeedEditScreen } from '#/screens/feeds/edit';
import { ServerContext } from '#/context/server';
import { LoginScreen } from '#/screens/login/login';
import { useProfile } from '#/hooks/profile';
import { AcceptInvitationScreen } from '#/screens/login/accept-invitation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<TabParamList>();
const ProfileStack = createNativeStackNavigator<ProfileParamList>();

const Profile = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const Tabs = () => {
  const theme = useTheme();
  const { profile } = useProfile();
  const canCreate = useMemo(
    () =>
      profile?.feeds?.find(
        f =>
          f.accessType === 'admin' ||
          f.accessType === 'moderator' ||
          f.accessType === 'writer'
      ),
    [profile]
  );
  return (
    <>
      <PushRegistation />
      <TabStack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
        }}
      >
        <TabStack.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            title: 'Posts',
            tabBarIcon: ({ focused }) => (
              <Icon
                color={focused ? 'primary' : 'text'}
                name="home"
                size={28}
              />
            ),
          }}
        />
        {canCreate && (
          <TabStack.Screen
            name="Add"
            component={AddPostScreen}
            options={{
              title: 'Add',
              tabBarIcon: ({ focused }) => (
                <Icon
                  color={focused ? 'primary' : 'text'}
                  name="plus-square"
                  size={28}
                />
              ),
            }}
          />
        )}
        <TabStack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Icon
                color={focused ? 'primary' : 'text'}
                name="user"
                size={28}
              />
            ),
          }}
        />
      </TabStack.Navigator>
    </>
  );
};

const Root = () => {
  const theme = useTheme();
  const { domain } = useContext(ServerContext);
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {domain ? (
        <>
          <RootStack.Group>
            <RootStack.Screen name="Main" component={Tabs} />
          </RootStack.Group>
          <RootStack.Group
            screenOptions={{
              contentStyle: {
                backgroundColor: theme.colors.shade,
              },
              presentation: 'modal',
            }}
          >
            <RootStack.Screen name="FeedEdit" component={FeedEditScreen} />
          </RootStack.Group>
        </>
      ) : (
        <RootStack.Group>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen
            initialParams={{ inviteCode: '' }}
            name="AcceptInvitation"
            component={AcceptInvitationScreen}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

interface RouterProps {
  colorScheme: string;
}

const Router: React.FC<RouterProps> = ({ colorScheme }) => {
  const theme = useTheme();
  const baseTheme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme]
  );
  const navigationTheme = useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: theme.colors.shade,
        card: theme.colors.background,
        text: theme.colors.text,
      },
    }),
    [baseTheme, theme]
  );
  return (
    <>
      <NavigationContainer linking={linkingConfig} theme={navigationTheme}>
        <Root />
      </NavigationContainer>
    </>
  );
};

export { Router };
