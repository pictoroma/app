import React, { useCallback, useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Avatar,
  Button,
  Cell,
  Group,
  Header,
  Icon,
  Input,
  Page,
  Popup,
  Row,
} from '#/components';
import { useProfile, useSetAvatar } from '#/hooks/profile';
import { ProfileMainScreenNavigationProp } from '#/router/types';
import { useCreateFeed } from '#/hooks/feeds';
import { ServerContext } from '#/context/server';
import { useSendInvite } from '#/hooks/users';
import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  flex: 1;
`

const ProfileScreen: React.FC<ProfileMainScreenNavigationProp> = ({
  navigation,
}) => {
  const { profile, feeds, refetch } = useProfile();
  const { logout } = useContext(ServerContext);
  const createFeed = useCreateFeed();
  const [addFeedVisible, setAddFeedVisible] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [feedName, setFeedName] = useState('');
  const setAvatar = useSetAvatar();
  const sendInvite = useSendInvite();
  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (result.cancelled || !result.base64) {
      return;
    }
    let [filename] = result.uri.split('/');
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : 'image';

    const file = {
      type,
      name: filename,
      uri: result.uri,
    };
    await setAvatar(file);
    await refetch();
  }, []);

  const saveAddFeed = useCallback(async () => {
    await createFeed(feedName);
    setFeedName('');
    setAddFeedVisible(false);
    await refetch();
  }, [feedName, createFeed]);

  const sendInviteAction = useCallback(async () => {
    await sendInvite(inviteEmail);
    setInviteEmail('');
    setInviteVisible(false);
    await refetch();
  }, [inviteEmail, sendInvite]);

  return (
    <Page>
      <Wrapper>
        <Header title="Profile" />
        <Row
          left={
            <Cell>
              <Avatar
                mediaId={profile?.avatar || undefined}
                onPress={pickImage}
              />
            </Cell>
          }
          title={profile?.name || profile?.username}
        />
        <Popup visible={addFeedVisible} onClose={() => setAddFeedVisible(false)}>
          <Row>
            <Input label="Name" value={feedName} onChangeText={setFeedName} />
          </Row>
          <Row>
            <Button title="Save" onPress={saveAddFeed} />
          </Row>
        </Popup>
        <Group
          title="My feeds"
          items={feeds}
          getKey={item => item.feed.id}
          add={
            profile?.admin
              ? () => {
                  setAddFeedVisible(true);
                }
              : undefined
          }
          render={item => (
            <Row
              title={item.feed.name}
              overline={item.accessType}
              right={
                <Cell>
                  <Button title="Leave" type="destructive" />
                </Cell>
              }
              onPress={() => {
                navigation.navigate('FeedEdit', { id: item.feed.id });
              }}
            />
          )}
        />
        {profile?.admin && (
          <Group title="Admin">
            <Row
              title="Invite"
              onPress={() => setInviteVisible(true)}
              left={(
                <Cell><Icon name="user-plus" color="text" /></Cell>
              )}
            />
            <Row
              title="Users"
              onPress={() => navigation.navigate('AdminUsers', {})}
              left={(
                <Cell><Icon name="users" color="text" /></Cell>
              )}
              right={(
                <Cell><Icon name="chevron-right" color="text" /></Cell>
              )}
            />
            <Row
              title="Feeds"
              onPress={() => navigation.navigate('AdminFeeds', {})}
              left={(
                <Cell><Icon name="layers" color="text" /></Cell>
              )}
              right={(
                <Cell><Icon name="chevron-right" color="text" /></Cell>
              )}
            />
            <Popup visible={inviteVisible} onClose={() => setInviteVisible(false)}>
              <Row>
                <Input label="Email" value={inviteEmail} onChangeText={setInviteEmail} />
              </Row>
              <Row>
                <Button title="Send" onPress={sendInviteAction} />
              </Row>
            </Popup>
          </Group>
        )}
        <Row>
          <Button title="Logout" type="destructive" onPress={logout} />
        </Row>
      </Wrapper>
    </Page>
  );
};

export { ProfileScreen };
