import { Header, Input, Page, Row, Button, Cell, Avatar } from '#/components';
import { useCreateCommentMutation, usePostQuery } from '#/hooks/graphql';
import { CommentsScreenNavigationProp } from '#/router/types';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Content = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const CommentsScreen: React.FC<CommentsScreenNavigationProp> = ({ route }) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState('');
  const [createCommentMutation] = useCreateCommentMutation();
  const { data, refetch } = usePostQuery({
    variables: {
      postId: id,
    },
  });

  const createComment = useCallback(async () => {
    await createCommentMutation({
      variables: {
        params: {
          content,
          post: id,
        },
      },
    });
    setContent('');
    await refetch();
  }, [content, id, createCommentMutation, refetch]);
  return (
    <Page>
      <Header title="Comments" />
      <Wrapper style={{ paddingBottom: insets.bottom + 20 }}>
        <Content>
          <FlatList
            style={{ flex: 1 }}
            inverted
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Row
                left={
                  <Cell>
                    <Avatar mediaId={item.creator.avatar || undefined} />
                  </Cell>
                }
                overline={item.creator.name || item.creator.username}
                description={item.content}
              />
            )}
            data={[...(data?.post.comments || [])].reverse()}
          />
        </Content>
        <Row right={<Button title="Send" onPress={createComment} />}>
          <Input
            label=" Say something..."
            value={content}
            onChangeText={setContent}
          />
        </Row>
      </Wrapper>
    </Page>
  );
};

export { CommentsScreen };
