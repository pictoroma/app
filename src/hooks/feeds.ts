import {
  useAddUserToFeedMutation,
  useCreateFeedMutation,
  useRemoveUserFromFeedMutation,
  useFeedQuery,
  useAllFeedsQuery,
  useRemoveFeedMutation,
} from '#/hooks/graphql';
import { useCallback, useMemo } from 'react';
import { useErrorNotification } from './utils';

const useFeed = (id: string) => {
  const { data, refetch, loading, error } = useFeedQuery({
    variables: { feedId: id },
  });
  useErrorNotification(error);
  const feed = useMemo(() => data?.feed, [data]);
  return {
    feed,
    refetch,
    loading,
    error,
  };
};

const useAllFeeds = () => {
  const { data, refetch, loading, error } = useAllFeedsQuery();
  useErrorNotification(error);
  const feeds = useMemo(() => data?.allFeeds || [], [data]);
  return {
    feeds,
    refetch,
    loading,
    error,
  };
};

const useCreateFeed = () => {
  const [createFeedMutation, { error }] = useCreateFeedMutation();
  useErrorNotification(error);
  const createFeed = useCallback(
    async (name: string) => {
      await createFeedMutation({
        variables: {
          name,
        },
      });
    },
    [createFeedMutation]
  );

  return createFeed;
};

const useAddUserToFeed = () => {
  const [addUserToFeedMutation, {error}] = useAddUserToFeedMutation();
  useErrorNotification(error);
  const addUserToFeed = useCallback(
    async (feedId: string, userId: string, accessType: string) => {
      await addUserToFeedMutation({
        variables: {
          feedId,
          userId,
          accessType,
        },
      });
    },
    [addUserToFeedMutation]
  );

  return addUserToFeed;
};

const useRemoveUserFromFeed = () => {
  const [removeUserFromFeedMutation, { error }] = useRemoveUserFromFeedMutation();
  useErrorNotification(error);
  const removeUserFromFeed = useCallback(
    async (feedId: string, userId: string) => {
      await removeUserFromFeedMutation({
        variables: {
          feedId,
          userId,
        },
      });
    },
    [removeUserFromFeedMutation]
  );

  return removeUserFromFeed;
};

export const useRemoveFeed = () => {
  const [removeFeedMutation, { error }] = useRemoveFeedMutation();
  useErrorNotification(error);
  const removeFeed = useCallback(
    async (id: string) => {
      await removeFeedMutation({
        variables: { feedId: id },
      });
    },
    [removeFeedMutation],
  );

  return removeFeed;
};

export { useAllFeeds, useFeed, useCreateFeed, useAddUserToFeed, useRemoveUserFromFeed };
