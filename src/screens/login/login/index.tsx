import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Input } from '#/components/Input';
import { Button } from '#/components/Button';
import { Cell, Row } from '#/components/Row';
import { ServerContext } from '#/context/server';
import { Header, Icon, Page } from '#/components';
import { LoginScreenNavigationProp } from '#/router/types';

import image from '#/../assets/images/tourist.png';

const Image = styled.Image`
  width: 300px;
  height: 300px;
`;

const Wrapper = styled.View`
  flex: 1; 
  justify-content: center;
  background: ${({ theme }) => theme.colors.shade};
`;

const Content = styled.View`
  padding: 15px;
  margin: 30px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 15px;
`
const Text = styled.Text``;

const LoginScreen: React.FC<LoginScreenNavigationProp> = ({
  navigation,
}) => {
  const { login } = useContext(ServerContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = useCallback(
    () => {
      setLoading(true);
      const run = async () => {
        await login(domain, username, password);
        setLoading(false);
      }
      run().catch((err) => {
        setLoading(false);
        setError(err);
      })
    },
    [domain, username, password],
  )


  if (loading) {
    return <Text>Loading</Text>
  }

  return (
    <Page>
      <Wrapper>
        <Content>
          <Image source={image} />
          {error && <Text>{error.toString()}</Text>}
            <Row left={<Cell><Icon name="server" /></Cell>}>
              <Input autoCorrect={false} label="Domain" value={domain} onChangeText={setDomain} />
            </Row>
          <Row left={<Cell><Icon name="user" /></Cell>}>
            <Input autoCorrect={false} label="Username" value={username} onChangeText={setUsername} />
          </Row>
          <Row left={<Cell><Icon name="key" /></Cell>}>
            <Input secure label="Secret" value={password} onChangeText={setPassword} />
          </Row>
          <Row>
            <Button onPress={doLogin} title="Login" />
          </Row>
        </Content>
      </Wrapper>
    </Page>
  )
}

export { LoginScreen };
