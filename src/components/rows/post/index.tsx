import { PostModel } from '#/hooks/graphql';
import styled from 'styled-components/native';
import { DeepPartial } from '#/helpers/types';
import { Cell, Row } from '#/components/Row';
import { Icon } from '#/components';
import { Gallery } from '#/components/gallery';
import { Body1 } from '#/typography';
import { Avatar } from '#/components/avatar';
import { useNavigation } from '@react-navigation/native';
import { Popup } from '#/components/Popup';
import { useState } from 'react';

type PostRowProps = {
  post: DeepPartial<PostModel>;
};

const Wrapper = styled.View``;

const PostRow: React.FC<PostRowProps> = ({ post }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <Wrapper>
      {post.media && <Gallery media={post!.media} />}
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
      <Popup onClose={() => setMenuVisible(false)} visible={menuVisible}>
      </Popup>
    </Wrapper>
  );
};

export { PostRow };
