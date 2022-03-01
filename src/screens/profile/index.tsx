import { useCallback, useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button, Cell, Group, Header, Input, Page, Popup, Row } from '#/components';
import { useProfile, useSetAvatar } from '#/hooks/profile';
import { ProfileMainScreenNavigationProp } from '#/router/types';
import { useCreateFeed } from '#/hooks/feeds';
import { ServerContext } from '#/context/server';

const ProfileScreen: React.FC<ProfileMainScreenNavigationProp> = ({
  navigation,
}) => {
  const { profile, feeds, refetch } = useProfile();
  const { logout } = useContext(ServerContext);
  const createFeed = useCreateFeed();
  const [addFeedVisible, setAddFeedVisible] = useState(false);
  const [feedName, setFeedName] = useState('');
  const setAvatar = useSetAvatar();
  const pickImage = useCallback(
    async () => {
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
      let type = match ? `image/${match[1]}` : `image`;

      const file = {
        type,
        name: filename,
        uri: result.uri,
      }
      await setAvatar(file);
      await refetch();
    },
    [],
  );
  const saveAddFeed = useCallback(
    async () => {
      await createFeed(feedName);
      setFeedName('');
      setAddFeedVisible(false);
      await refetch();
    },
    [feedName, createFeed],
  );
  return (
    <Page>
      <Header title="Profile" /> 
      <Row
        left={(
          <Cell>
            <Avatar
              mediaId={profile?.avatar || undefined}
              onPress={pickImage} 
            />
          </Cell>
        )}
        title={profile?.name || profile?.username}
      /> 
      <Popup
        visible={addFeedVisible}
        onClose={() => setAddFeedVisible(false)}
      >
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
        add={profile?.admin ? () => {
          setAddFeedVisible(true);
        } : undefined}
        render={item => (
          <Row
            title={item.feed.name}
            overline={item.accessType}
            right={(
              <Cell>
                <Button title="Leave" type="destructive" />
              </Cell>
            )}
            onPress={() => {
              navigation.navigate('FeedEdit', { id: item.feed.id })
            }}
          />
        )}
      />
      <Row>
        <Button title="Logout" type="destructive" onPress={logout} />
      </Row>
    </Page>
  )
};

export { ProfileScreen }
