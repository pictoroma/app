import { NotificationInfo } from '#/context/notifications';
import { Cell, Row } from '#/components/Row';
import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '../Icon';
import { Body1 } from '#/typography';

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
        left={(
          <Cell><Icon name="alert-circle" color="destructiveAlt" /></Cell>
        )}
        right={
          <Cell onPress={dismiss}>
            <Icon name="x" color="destructiveAlt" />
          </Cell>
        }
      >
        <Body1 color="destructiveAlt">{notification.text}</Body1>
      </Row>
    </Wrapper>
  );
}

export { Notification };


