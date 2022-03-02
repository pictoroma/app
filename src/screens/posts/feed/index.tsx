import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { AddScreenNavigationProp } from '#/router/types';
import { useFeed } from '#/hooks/posts';
import { Page } from '#/components/Page';
import { PostFilter, PostRow } from '#/components';
import { Header } from '#/components';
import { useProfile } from '#/hooks/profile';

const Seperator = styled.View`
  margin-top: 15px;
  border-bottom-width: 5px;
  margin-bottom: 15px;
  border-color: ${({ theme }) => theme.colors.shade};
`;
const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

const FeedScreen: React.FC<AddScreenNavigationProp> = () => {
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  const { posts, loading, refetch } = useFeed(
    selectedFeeds.length > 0 ? selectedFeeds : undefined
  );
  const { feeds } = useProfile();

  const userFeeds = useMemo(() => feeds.map(f => f.feed), [feeds]);

  const renderItem: ListRenderItem<typeof posts[0]> = useCallback(
    ({ item }) => <PostRow key={item.id} post={item} />,
    []
  );

  const ListHeader = useMemo(
    () => () =>
      (
        <Header
          key="test"
          title="All posts"
          right={
            <>
              {userFeeds.length > 1 && (
                <PostFilter
                  feeds={userFeeds}
                  selected={selectedFeeds}
                  onSelect={setSelectedFeeds}
                />
              )}
            </>
          }
        />
      ),
    [userFeeds, selectedFeeds, setSelectedFeeds]
  );

  return (
    <Page>
      <Wrapper>
        <FlatList
          ListHeaderComponent={<ListHeader />}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={Seperator}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />
      </Wrapper>
    </Page>
  );
};

export { FeedScreen };
