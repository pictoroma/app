import { NotificationContext } from "#/context/notifications"
import { useContext } from "react"

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  return context;
};
