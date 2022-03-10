import { Avatar, Cell, Header, Icon, Input, Page, Row } from '#/components';
import { useRemoveUser, useUsers } from '#/hooks/users';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList } from 'react-native';

const AdminUsersScreen = () => {
  const [searchText, setSearchText] = useState('');
  const removeUser = useRemoveUser();
  const { users, refetch } = useUsers();
  const result = useMemo(
    () => users?.filter(user => !searchText || user?.username.toLowerCase().includes(searchText.toLowerCase())) || [],
    [users, searchText],
  );
  const remove = useCallback(
    async (id: string) => {
      Alert.alert(
        'Are you sure?',
        undefined,
        [
          { text: 'Yes', onPress: () => removeUser(id).then(() => refetch()) },
          { text: 'Cancel', style: 'cancel' },
        ]
      )
    },
    []
  )
  return (
    <Page>
      <Header title="Users" back />
      <Row
        left={(
          <Cell><Icon name="search" /></Cell>
        )}
      >
        <Input label="Search" value={searchText} onChangeText={setSearchText} />
      </Row>
      <FlatList
        data={result}
        keyExtractor={user => user.id}
        renderItem={({ item }) => (
          <Row
            overline={item.username}
            title={item.name || item.username}
            left={(
              <Cell><Avatar mediaId={item.avatar || undefined} /></Cell>
            )}
            right={(
              <>
                <Cell><Icon name="edit" /></Cell>
                <Cell onPress={() => remove(item.id)}><Icon name="trash-2" color="destructive" /></Cell>
              </>
            )}
          />
        )}
      />
    </Page>
  )
}

export { AdminUsersScreen };
