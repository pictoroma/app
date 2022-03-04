import { PostModel, useRemovePostMutation } from '#/hooks/graphql';
import styled from 'styled-components/native';
import { DeepPartial } from '#/helpers/types';
import { Cell, Row } from '#/components/Row';
import { Icon } from '#/components/Icon';
import { Gallery } from '#/components/gallery';
import { Body1 } from '#/typography';
import { Avatar } from '#/components/avatar';
import { useNavigation } from '@react-navigation/native';
import { Popup } from '#/components/Popup';
import { useCallback, useState } from 'react';
import { useProfile } from '#/hooks/profile';
import { useFeed, useRemovePost } from '#/hooks/posts';
import { Button } from '#/components/Button';
import { OverlayLoader } from '#/components/loaders';

type PostRowProps = {
  post: DeepPartial<PostModel>;
  fullWidth: boolean;
};

const Wrapper = styled.View<{
  fullWidth: boolean;
}>`
  ${({ fullWidth, theme }) => fullWidth ? `
    border-top-width: 7px; 
    border-color: ${theme.colors.shade};
  ` : `
    background-color: ${theme.colors.shade};
    margin: 7px;
    border-radius: 7px;
  `}
`;

const PostRow: React.FC<PostRowProps> = ({ post, fullWidth }) => {
  const navigation = useNavigation();
  const { removePost, loading } = useRemovePost();
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Wrapper fullWidth={fullWidth}>
      {loading && <OverlayLoader />}
      <Row
        left={
          <Cell>
            <Avatar mediaId={post?.creator?.avatar!} />
          </Cell>
        }
        right={
          (
            <>
              <Cell onPress={() => navigation.navigate('Comments', { id: post.id })}>
                <Icon name="message-circle" color="text" size={20} />
                <Body1>{post.commentCount}</Body1>
              </Cell>
              <Cell onPress={() => setMenuVisible(true)}>
                <Icon name="more-horizontal" color="text" size={20} />
              </Cell>
            </>
          )
        }
        description={post.body}
        overline={post.creator?.name || post.creator?.username}
      />
      {post.media && <Gallery media={post!.media} />}
      <Popup onClose={() => setMenuVisible(false)} visible={menuVisible}>
        <Button onPress={() => removePost(post.id!)} title="Remove" type="destructive" />
      </Popup>
    </Wrapper>
  );
};

export { PostRow };
