import { HomeContext } from '#/context/home';
import { ServerContext } from '#/context/server';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  useCreatePostMutation,
  useProfileQuery,
  useRemovePostMutation,
} from './graphql';
import { useCreateMedia } from './media';
import { useNotifications } from './notifications';

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const useCreatePostData = () => {
  const { data, refetch, loading, error } = useProfileQuery();
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
  const { show, dismiss } = useNotifications();
  const [createPostMutation, { error }] = useCreatePostMutation();
  useEffect(
    () => {
      if (!error) {
        return;
      } 
      const id = show({
        type: 'error',
        text: error.message,
      });
      return () => {
        dismiss(id);
      }
    },
    [error, show, dismiss],
  )
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

export const useRemovePost = () => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useFeed();
  const [removePostMutation, { error }] = useRemovePostMutation();
  const { show, dismiss } = useNotifications();
  useEffect(
    () => {
      if (!error) {
        return;
      } 
      const id = show({
        type: 'error',
        text: error.message,
      });
      return () => {
        dismiss(id);
      }
    },
    [error, show, dismiss],
  )
  const removePost = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await removePostMutation({
          variables: { removePostId: id },
        });
        await refetch();
      } finally {
        setLoading(false);
      }
    },
    [removePostMutation],
  )

  return { removePost, loading };
};

export const useFeed = () => {
  const context = useContext(HomeContext);
  return context;
};
