
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Input } from '#/components/Input';
import { Button } from '#/components/Button';
import { Cell, Row } from '#/components/Row';
import { AcceptInvitationScreenNavigationProp } from '#/router/types';
import { ServerContext } from '#/context/server';
import { Text } from 'react-native';
import { Header, Icon, Page } from '#/components';

import image from '#/../assets/images/tourist.png';

const Image = styled.Image`
  width: 300px;
  height: 300px;
`;

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  flex: 1;
`;

const Content = styled.View`
  padding: 15px;
  margin: 30px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 15px;
`

const AcceptInvitationScreen: React.FC<AcceptInvitationScreenNavigationProp> = ({
  route,
  navigation,
}) => {
  const { inviteCode } = route.params;
  const { acceptInvitation } = useContext(ServerContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const doAccept = useCallback(
    () => {
      setLoading(true);
      const run = async () => {
        await acceptInvitation(inviteCode, username, password);
        setLoading(false);
      }
      run().catch((err) => {
        setLoading(false);
        setError(err);
      })
    },
    [inviteCode, username, password],
  )

  if (loading) {
    return <Text>Loading</Text>
  }

  return (
    <Page>
      <Wrapper>
        <Content>
          <Image source={image} />
          <Row description="You are almost there! Just pick your username and password and off we go!" />
          <Row left={<Cell><Icon name="user" /></Cell>}>
            <Input autoCorrect={false} label="Username" value={username} onChangeText={setUsername} />
          </Row>
          <Row left={<Cell><Icon name="key" /></Cell>}>
            <Input secure label="Password" value={password} onChangeText={setPassword} />
          </Row>
          <Row>
            <Button onPress={doAccept} title="Let's GO" />
          </Row>
        </Content>
      </Wrapper>
    </Page>
  )
}

export { AcceptInvitationScreen };
