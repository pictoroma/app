import { useAddUserToFeedMutation, useCreateFeedMutation, useRemoveUserFromFeedMutation, useFeedQuery } from '#/hooks/graphql';
import { useCallback, useMemo } from 'react';

export const useFeed = (id: string) => {
  const { data, refetch, loading, error } = useFeedQuery({
    variables: { feedId: id },
  });
  const feed = useMemo(
    () => data?.feed,
    [data],
  );
  return {
    feed,
    refetch,
    loading,
    error,
  };
}

const useCreateFeed = () => {
  const [createFeedMutation] = useCreateFeedMutation();
  const createFeed = useCallback(
    async (name: string) => {
      await createFeedMutation({
        variables: {
          name,
        }
      })
    },
    [createFeedMutation],
  );

  return createFeed;
};

const useAddUserToFeed = () => {
  const [addUserToFeedMutation] = useAddUserToFeedMutation();
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
    [addUserToFeedMutation],
  );

  return addUserToFeed;
}

const useRemoveUserFromFeed = () => {
  const [removeUserFromFeedMutation] = useRemoveUserFromFeedMutation();
  const removeUserFromFeed = useCallback(
    async (feedId: string, userId: string) => {
      await removeUserFromFeedMutation({
        variables: {
          feedId,
          userId,
        },
      });
    },
    [removeUserFromFeedMutation],
  );

  return removeUserFromFeed;
}

export { useCreateFeed, useAddUserToFeed, useRemoveUserFromFeed };
