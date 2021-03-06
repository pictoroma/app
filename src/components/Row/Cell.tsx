import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '#/theme';

interface Props {
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  children?: ReactNode;
  onPress?: () => any;
  background?: keyof Theme['colors'];
  flex?: string | number;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

const Wrapper = styled.View<{
  background?: keyof Theme['colors'];
  flex?: string | number;
  direction?: 'row' | 'column';
  theme: Theme;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}>`
  padding: ${({ theme }) => theme.margins.medium / 2}px
    ${({ theme }) => theme.margins.medium / 2}px;
  ${({ background, theme }) => (background ? `background: ${theme.colors[background]};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  align-items: ${({ align }) => (align ? align : 'center')};
`;

const Touch = styled.TouchableOpacity``;

const Cell: React.FC<Props> = ({ children, onPress, ...props }) => {
  const {
    accessibilityLabel,
    accessibilityRole,
    accessibilityHint,
    ...others
  } = props;
  const node = <Wrapper {...others}>{children}</Wrapper>;
  if (onPress) {
    return (
      <Touch
        accessible
        accessibilityRole={accessibilityRole || 'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        onPress={onPress}
      >
        {node}
      </Touch>
    );
  }
  return node;
};

export { Cell };
