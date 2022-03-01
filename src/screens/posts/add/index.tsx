import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components/native';
import { AddScreenNavigationProp } from '#/router/types';
import { UploadFile, useCreatePost } from '#/hooks/posts';
import { useFocusEffect } from '@react-navigation/native';
import { Page, FeedInput, AddImages, Row, Input, Button} from '#/components';
import { Header } from '#/components';
import { useProfile } from '#/hooks/profile';

const Wrapper = styled.ScrollView`
  flex: 1;
`;
const Outer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const AddPostScreen: React.FC<AddScreenNavigationProp> = ({ navigation }) => {
  const { feeds, refetch } = useProfile();
  const [selectedFeed, setSelectedFeed] = useState<any>()
  const [media, setMedia] = useState<UploadFile[]>([]);
  const [body, setBody] = useState('');
  const createPost = useCreatePost();
  const adminFeeds = useMemo(
    () => feeds?.filter(f => f.accessType === 'admin').map(f => f.feed) || [],
    [feeds],
  );

  const submit = useCallback(
    async () => {
      await createPost(selectedFeed.id, body, media);
      setSelectedFeed(undefined);
      setMedia([]);
      setBody('');
      navigation.navigate('Feed', {});
    },
    [selectedFeed, body, media]
  );
  useFocusEffect(
    useCallback(
      () => { refetch(); },
      [refetch],
    ),
  );

  if (!feeds) {
    return <></>
  }

  return (
    <Page>
      <Outer>
        <Header title="Create post" />
        <Wrapper>
          <AddImages files={media} onUpdate={setMedia} />
          <FeedInput
            label="Feed"
            feeds={adminFeeds}
            selected={selectedFeed}
            onSelect={setSelectedFeed}
          />
          <Row overline="Content">
            <Input label="Tell your story..." value={body} onChangeText={setBody} />
          </Row>
        </Wrapper>
        <Row>
          {!!selectedFeed && media.length > 0 &&  <Button onPress={submit} title="Create" />}
        </Row>
      </Outer>
    </Page>
  );
}

export { AddPostScreen };
