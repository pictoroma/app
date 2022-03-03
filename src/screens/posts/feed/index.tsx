import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { ListRenderItem, FlatList, RefreshControl, Dimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
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
  const columns = useMemo(
    () => Math.ceil(Dimensions.get('window').width / 500),
    [],
  );

  const renderItem: ListRenderItem<typeof posts[0]> = useCallback(
    ({ item }) => <PostRow key={item.id} post={item} />,
    []
  );

  return (
    <Page>
      <Wrapper>
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
        <MasonryList
          data={posts}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          numColumns={columns}
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
