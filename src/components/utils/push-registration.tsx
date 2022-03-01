import { ServerContext } from '#/context/server';
import { useRegisterPushNotificationMutation } from '#/hooks/graphql';
import React, { useContext, useEffect } from 'react';

const PushRegistation: React.FC<{}> = () => {
  const { pushToken } = useContext(ServerContext);
  const [registerPushMutation] = useRegisterPushNotificationMutation();

  useEffect(
    () => {
      if (!pushToken) {
        return;
      }
      registerPushMutation({
        variables: {
          token: pushToken,
        }
      });
    },
    [pushToken],
  )

  return <></>;
};

export { PushRegistation };
