import { useMemo } from 'react';
import { useUsersQuery } from './graphql';
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
