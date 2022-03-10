import {
  Group,
  NameValueInput,
  Header,
  Input,
  Page,
  Popup,
  Row,
  UserInput,
  NameValueInputItem,
  Button,
  Cell,
} from '#/components';
import {
  useAddUserToFeed,
  useFeed,
  useRemoveUserFromFeed,
} from '#/hooks/feeds';
import { UserModel } from '#/hooks/graphql';
import { useUsers } from '#/hooks/users';
import { FeedEditScreenNavigationProp } from '#/router/types';
import { useCallback, useState } from 'react';
import { PartialDeep } from 'type-fest';

const accessTypes = [
  { key: 'Admin', value: 'admin' },
  { key: 'Moderator', value: 'moderator' },
  { key: 'Writer', value: 'writer' },
  { key: 'Reader', value: 'reader' },
];

const FeedEditScreen: React.FC<FeedEditScreenNavigationProp> = ({ route }) => {
  const { id } = route.params;
  const { feed, refetch } = useFeed(id);
  const { users } = useUsers();
  const removeUserFromFeed = useRemoveUserFromFeed();
  const addUserToFeed = useAddUserToFeed();
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [addUserSelected, setAddUserSelected] =
    useState<PartialDeep<UserModel>>();
  const [addUserAccessType, setAddUserAccessType] =
    useState<NameValueInputItem>();

  const addUser = useCallback(async () => {
    await addUserToFeed(id, addUserSelected!.id!, addUserAccessType!.value);
    setAddUserSelected(undefined);
    setAddUserAccessType(undefined);
    setAddUserVisible(false);
    await refetch();
  }, [id, addUserSelected, addUserAccessType]);

  const removeUser = useCallback(
    async (userId: string) => {
      await removeUserFromFeed(id, userId);
      await refetch();
    },
    [id, removeUserFromFeed, refetch]
  );

  if (!feed) {
    return <></>;
  }

  return (
    <Page>
      <Header back title="Feed" />
      <Row>
        <Input label="Name" value={feed.name} />
      </Row>
      <Group
        title="Users"
        add={() => {
          setAddUserVisible(true);
        }}
        items={feed.users}
        getKey={relation => relation.user.id}
        render={relation => (
          <Row
            overline={relation.accessType}
            title={relation.user.name || relation.user.username}
            right={
              <Cell>
                <Button
                  title="Remove"
                  onPress={() => removeUser(relation.user.id)}
                />
              </Cell>
            }
          />
        )}
      />
      <Popup visible={addUserVisible} onClose={() => setAddUserVisible(false)}>
        <UserInput
          label="User"
          selected={addUserSelected}
          onSelect={user => setAddUserSelected(user!)}
          users={users}
        />
        <NameValueInput
          label="Access type"
          selected={addUserAccessType}
          onSelect={accessType => setAddUserAccessType(accessType!)}
          items={accessTypes}
        />
        {!!addUserAccessType && !!addUserSelected && (
          <Row>
            <Button title="Save" onPress={addUser} />
          </Row>
        )}
      </Popup>
    </Page>
  );
};

export { FeedEditScreen };
