import { PostModel } from '#/hooks/graphql';
import styled from 'styled-components/native';
import { DeepPartial } from '#/helpers/types';
import { Cell, Row } from '#/components/Row';
import { Icon } from '#/components';
import { Gallery } from '#/components/gallery';
import { Body1 } from '#/typography';
import { Avatar } from '#/components/avatar';

type PostRowProps = {
  post: DeepPartial<PostModel>;
};

const Wrapper = styled.View``;

const PostRow: React.FC<PostRowProps> = ({ post }) => {
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
          false && (
            <>
              <Cell>
                <Icon name="message-circle" color="text" size={20} />
                <Body1>0</Body1>
              </Cell>
              <Cell>
                <Icon name="bookmark" color="text" size={20} />
              </Cell>
            </>
          )
        }
        description={post.body}
        overline={post.creator?.name || post.creator?.username}
      />
    </Wrapper>
  );
};

export { PostRow };
