import { ServerContext } from '#/context/server';
import { useCallback, useContext, useMemo } from 'react';
import {
  useCreatePostMutation,
  usePostsQuery,
  useProfileFeedsQuery,
} from './graphql';
import { useCreateMedia } from './media';

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const useCreatePostData = () => {
  const { data, refetch, loading, error } = useProfileFeedsQuery();
  const feeds = useMemo(
    () => data?.profile?.feeds.filter(f => f.accessType === 'admin'),
    [data]
  );

  return {
    feeds,
    refetch,
    loading,
    error,
  };
};

export const useCreatePost = () => {
  const { domain, token } = useContext(ServerContext);
  const [createPostMutation] = useCreatePostMutation();
  const createMedia = useCreateMedia();
  const createPost = useCallback(
    async (feed: string, body: string, media: UploadFile[]) => {
      const ids = await createMedia(media);
      await createPostMutation({
        variables: {
          params: {
            feed,
            body,
            media: ids,
          },
        },
      });
    },
    [createPostMutation, token, domain]
  );

  return createPost;
};

export const useFeed = (feeds?: string[]) => {
  const { data, ...props } = usePostsQuery({
    variables: {
      filter: {
        feeds,
      },
    },
  });

  console.log(props.error);

  const posts = useMemo(() => data?.posts || [], [data]);

  return {
    ...props,
    posts,
  };
};
