import { NotificationInfo } from '#/context/notifications';
import { Cell, Row } from '#/components/Row';
import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '../Icon';

type Props = {
  notification: NotificationInfo;
  dismiss: () => void;
}

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.destructive};
  margin: 5px;
  border-radius: 5px;
`

const Notification: React.FC<Props> = ({ notification, dismiss }) => {
  return (
    <Wrapper>
      <Row
        description={notification.text}
        right={
          <Cell onPress={dismiss}>
            <Icon name="x" color="text" />
          </Cell>
        }
      />
    </Wrapper>
  );
}

export { Notification };


