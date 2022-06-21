import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProfileParamList = {
  ProfileMain: {};
  AdminUsers: {};
  AdminFeeds: {};
  FeedEdit: {
    id: string;
  };
};

export type TabParamList = {
  Feed: {};
  Add: {};
  Profile: { userId: string };
};

export type RootStackParamList = {
  Main: {};
  Comments: {
    id: string;
  };
  Login: {};
  AcceptInvitation: {
    inviteCode: string;
  };
};

export type MainStackProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export type TabStackProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  MainStackProps
>;

export type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type AcceptInvitationScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'AcceptInvitation'
>;

export type CommentsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Comments'
>;

export type FeedScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  MainStackProps
>;

export type AddScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Add'>,
  MainStackProps
>;

export type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  MainStackProps
>;

export type FeedEditScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  MainStackProps
>;

export type ProfileMainScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<ProfileParamList>,
  MainStackProps
>;
