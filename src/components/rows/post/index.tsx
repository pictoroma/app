import { PostModel } from '#/hooks/graphql';
import styled from 'styled-components/native';
import { DeepPartial } from '#/helpers/types';
import { Cell, Row } from '#/components/Row';
import { Icon } from '#/components/Icon';
import { Gallery } from '#/components/gallery';
import { Body1, Overline } from '#/typography';
import { Avatar } from '#/components/avatar';
import { useNavigation } from '@react-navigation/native';
import { Popup } from '#/components/Popup';
import React, { useState } from 'react';
import { useRemovePost } from '#/hooks/posts';
import { Button } from '#/components/Button';
import { OverlayLoader } from '#/components/loaders';

type PostRowProps = {
  post: DeepPartial<PostModel>;
  fullWidth: boolean;
};

const Wrapper = styled.View<{
  fullWidth: boolean;
}>`
  ${({ fullWidth, theme }) =>
    fullWidth
      ? `
    background-color: ${theme.colors.background};
  `
      : `
    background-color: ${theme.colors.background};
    margin: 7px;
    border-radius: 7px;
  `}
`;

const Top = styled.View`
  flex-direction: row;
  margin: 0 ${({ theme }) => theme.margins.small * 4}px;
`;

const Image = styled.View`
  margin: 0 ${({ theme }) => theme.margins.small * 2}px;
`;

const TopSide = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TopMain = styled.View`
  flex: 1;
  justify-content: center;
`;

const PostRow: React.FC<PostRowProps> = ({ post, fullWidth }) => {
  const navigation = useNavigation();
  const { removePost, loading } = useRemovePost();
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Wrapper fullWidth={fullWidth}>
      {loading && <OverlayLoader />}
      {post.media && <Image><Gallery media={post!.media} /></Image>}
      <Top>
        <TopSide>
          <Cell>
            <Avatar mediaId={post?.creator?.avatar!} />
          </Cell>
        </TopSide>
        <TopMain>
          <Overline>{post?.creator?.name || post?.creator?.username}</Overline>
          {!!post?.body && <Body1>{post?.body}</Body1>}
        </TopMain>
        <TopSide>
          <Cell
            onPress={() => navigation.navigate('Comments', { id: post.id })}
          >
            <Icon name="message-circle" color="text" size={20} />
            <Body1>{post.commentCount}</Body1>
          </Cell>
          <Cell onPress={() => setMenuVisible(true)}>
            <Icon name="more-horizontal" color="text" size={20} />
          </Cell>
        </TopSide>
      </Top>
      <Popup onClose={() => setMenuVisible(false)} visible={menuVisible}>
        <Button
          onPress={() => removePost(post.id!)}
          title="Remove"
          type="destructive"
        />
      </Popup>
    </Wrapper>
  );
};

export { PostRow };
