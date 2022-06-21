import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { ListRenderItem, RefreshControl, Dimensions } from 'react-native';
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

const onlyOnce = (fn: () => Promise<any>) => {
  let running = false;
  console.log('setup');
  return () => {
    if (running) {
      return;
    }
    console.log('run', running);
    running = true;
    fn()
      .then(() => {
        running = false;
      })
      .catch(() => {
        running = false;
      });
  };
};

const FeedScreen: React.FC<AddScreenNavigationProp> = () => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const {
    posts,
    loading,
    refetch,
    fetchMore,
    feeds: selectedFeeds,
    setFeeds: setSelectedFeeds,
  } = useFeed();
  const { feeds } = useProfile();

  const userFeeds = useMemo(() => feeds.map(f => f.feed), [feeds]);
  const columns = useMemo(
    () => Math.ceil(Dimensions.get('window').width / 500),
    []
  );

  const renderItem: ListRenderItem<typeof posts[0]> = useCallback(
    ({ item }) => (
      <PostRow fullWidth={columns <= 1} key={item.id} post={item} />
    ),
    [columns]
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
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              fetchMore({
                variables: {
                  filter: {
                    offset: posts.length,
                  },
                },
              });
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          numColumns={columns}
          ItemSeparatorComponent={Seperator}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />
      </Wrapper>
    </Page>
  );
};

export { FeedScreen };
