import { Notification } from '#/components/notification';
import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

type NotificationInfo = {
  type: 'info' | 'error';
  text: string;
  autoHideAfter?: number;
  actions?: {
    title: string;
    onPress: () => void;
    dismissOnPress: boolean;
  };
};

type InternalNotification = NotificationInfo & {
  id: number;
};

type NotificationContextValue = {
  show: (notification: NotificationInfo) => number;
  dismiss: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextValue>(
  undefined as any
);

const Wrapper = styled.View<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  width: 100%;
  z-index: 1000;
`;

let nextId = 0;

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<InternalNotification[]>(
    []
  );
  const insets = useSafeAreaInsets();

  const show = useCallback(
    (notification: NotificationInfo) => {
      const id = nextId++;
      setNotifications(current => [...current, { ...notification, id }]);
      return id;
    },
    [setNotifications]
  );

  const dismiss = useCallback(
    (id: number) => {
      setNotifications(current => current.filter(c => c.id !== id));
    },
    [setNotifications]
  );

  const context = useMemo(
    () => ({
      show,
      dismiss,
    }),
    [show, dismiss]
  );

  return (
    <NotificationContext.Provider value={context}>
      {notifications.length > 0 && (
        <Wrapper top={insets.top}>
          {notifications.map((notification, index) => (
            <Notification
              dismiss={() => dismiss(notification.id)}
              key={index}
              notification={notification}
            />
          ))}
        </Wrapper>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export type { NotificationInfo };
export { NotificationProvider, NotificationContext };
