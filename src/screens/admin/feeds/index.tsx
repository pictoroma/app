import { Avatar, Cell, Header, Icon, Input, Page, Row } from '#/components';
import { useAllFeeds, useRemoveFeed } from '#/hooks/feeds';
import { ProfileMainScreenNavigationProp } from '#/router/types';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList } from 'react-native';

const AdminFeedsScreen: React.FC<ProfileMainScreenNavigationProp> = ({
  navigation,
}) => {
  const [searchText, setSearchText] = useState('');
  const removeFeed = useRemoveFeed();
  const { feeds, refetch } = useAllFeeds();
  const result = useMemo(
    () => feeds?.filter(feed => !searchText || feed?.name.toLowerCase().includes(searchText.toLowerCase())) || [],
    [feeds, searchText],
  );
  const remove = useCallback(
    async (id: string) => {
      Alert.alert(
        'Are you sure?',
        undefined,
        [
          { text: 'Yes', onPress: () => removeFeed(id).then(() => refetch()) },
          { text: 'Cancel', style: 'cancel' },
        ]
      )
    },
    []
  )
  return (
    <Page>
      <Header title="Feeds" back />
      <Row
        left={(
          <Cell><Icon name="search" /></Cell>
        )}
      >
        <Input label="Search" value={searchText} onChangeText={setSearchText} />
      </Row>
      <FlatList
        data={result}
        keyExtractor={feed => feed.id}
        renderItem={({ item }) => (
          <Row
            title={item.name}
            overline={`${item.users.length} user(s), admins: ${item.users.filter(user => user.accessType === 'admin').map(u => u.user.username).join(', ')}`}
            left={(
              <Cell><Icon color="text" name="layers" /></Cell>
            )}
            right={(
              <>
                <Cell
                  onPress={() => navigation.navigate('FeedEdit', { id: item.id })}
                >
                  <Icon name="edit" />
                </Cell>
                <Cell onPress={() => remove(item.id)}><Icon name="trash-2" color="destructive" /></Cell>
              </>
            )}
          />
        )}
      />
    </Page>
  )
}

export { AdminFeedsScreen };
