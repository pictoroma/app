import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Theme } from '#/theme';

type Props = {
  size?: number;
  color?: keyof Theme['colors'];
  name: keyof typeof Feather.glyphMap;
};

function Icon({ size, color, name }: Props) {
  const theme = useTheme();
  return (
    <Feather
      name={name}
      color={color ? theme.colors[color] : theme.colors.icon}
      size={size ?? theme.sizes.icons}
    />
  );
}

export { Icon };
