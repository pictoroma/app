import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Icon } from '#/components/Icon';
import { Modal } from '#/components/Modal';
import { Row, Cell } from '#/components/Row';
import { Page } from '#/components/Page';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Top = styled.Pressable`
  flex: 1;
`;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 200px;
  border-radius: 12px;
  margin-bottom: -12px;
`;

const Outer = styled.View`
  flex: 1;
`;

const Popup: React.FC<Props> = ({ visible, children, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Page>
        <Outer>
          <Top onPress={onClose} />
          <Wrapper style={{ paddingBottom: insets.bottom + 12 }}>
            <Row
              right={
                <Cell onPress={onClose}>
                  <Icon name="x-circle" />
                </Cell>
              }
            />
            {children}
          </Wrapper>
        </Outer>
      </Page>
    </Modal>
  );
};

export { Popup };
