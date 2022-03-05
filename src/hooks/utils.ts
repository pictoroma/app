import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { useNotifications } from "./notifications";

export const useErrorNotification = (error?: ApolloError) => {
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
      };
    },
    [error, show, dismiss],
  )
}
