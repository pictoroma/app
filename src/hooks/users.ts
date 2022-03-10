import { useCallback, useMemo } from 'react';
import { useInviteProfileMutation, useUsersQuery } from './graphql';
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
