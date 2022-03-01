import { useMemo } from "react";
import { useUsersQuery } from "./graphql";

export const useUsers = () => {
  const { data, refetch, loading, error } = useUsersQuery();
  const users = useMemo(
    () => data?.users,
    [data],
  );
  return {
    users,
    refetch,
    loading,
    error,
  };
}
