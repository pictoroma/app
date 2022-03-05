import {
  useAddUserToFeedMutation,
  useCreateFeedMutation,
  useRemoveUserFromFeedMutation,
  useFeedQuery,
} from '#/hooks/graphql';
import { useCallback, useMemo } from 'react';
import { useErrorNotification } from './utils';

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

export { useCreateFeed, useAddUserToFeed, useRemoveUserFromFeed };
