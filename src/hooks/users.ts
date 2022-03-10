import { useCallback, useMemo } from 'react';
import { useInviteProfileMutation, useRemoveUserMutation, useUsersQuery } from './graphql';
import { useErrorNotification } from './utils';

export const useUsers = () => {
  const { data, refetch, loading, error } = useUsersQuery();
  useErrorNotification(error);
  const users = useMemo(() => data?.users, [data]);
  return {
    users,
    refetch,
    loading,
    error,
  };
};

export const useSendInvite = () => {
  const [sendInviteMutation, { error }] = useInviteProfileMutation();
  useErrorNotification(error);
  const sendInvite = useCallback(
    async (email: string) => {
      await sendInviteMutation({
        variables: { email },
      });
    },
    [sendInviteMutation],
  );

  return sendInvite;
};

export const useRemoveUser = () => {
  const [removeUserMutation, { error }] = useRemoveUserMutation();
  useErrorNotification(error);
  const removeUser = useCallback(
    async (id: string) => {
      await removeUserMutation({
        variables: { userId: id },
      });
    },
    [removeUserMutation],
  );

  return removeUser;
};
