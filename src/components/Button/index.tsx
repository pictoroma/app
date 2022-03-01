import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Theme } from '#/theme';
import { Link } from '#/typography';

interface Props {
  title: string;
  onPress?: () => any;
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Touch = styled.TouchableOpacity``;

const getColors = (type: Props['type'], theme: Theme) => {
  if (type === 'secondary') {
    return { bg: theme.colors.secondary, fg: '#fff' };
  }
  if (type === 'destructive') {
    return { bg: 'transparent', fg: theme.colors.destructive };
  }
  return { bg: theme.colors.primary, fg: '#fff' };
}

const Wrapper = styled.View<{
  theme: Theme,
  type: Props['type']
}>`
  background: ${({ theme, type }) => getColors(type, theme).bg};
  padding: ${({ theme }) => theme.margins.small}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  align-items: center;
`;

const StyledLink = styled<{
  theme: Theme,
  type: Props['type']
}>(Link)`
  color: ${({ theme, type }) => getColors(type, theme).fg};
  font-weight: bold;
`

const Button: React.FC<Props> = ({
  title,
  onPress,
  accessibilityHint,
  accessibilityRole,
  accessibilityLabel,
  type,
}) => (
  <Touch
    onPress={onPress}
    accessible
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
    accessibilityLabel={accessibilityLabel}
  >
    <Wrapper type={type}>
      <StyledLink type={type}>{title}</StyledLink>
    </Wrapper>
  </Touch>
);

export { Button };

