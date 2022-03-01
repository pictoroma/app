import React from 'react';
import { KeyboardType } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface Props {
  label: string;
  value: string;
  onChangeText?: (text: string) => any;
  type?: KeyboardType;
  autoCorrect?: boolean;
  secure?: boolean;
}

const InputField = styled.TextInput`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.margins.small}px 0;
  font-size: ${({ theme }) => theme.font.baseSize}px;
  width: 100%;
`;

const Input: React.FC<Props> = ({ 
  label,
  value,
  onChangeText,
  type,
  autoCorrect,
  secure,
}) => {
  const theme = useTheme();
  return (
    <InputField
      value={value}
      keyboardType={type}
      autoCapitalize={'none'}
      autoCorrect={autoCorrect}
      secureTextEntry={secure}
      placeholderTextColor={theme.colors.textShade}
      placeholder={label}
      onChangeText={onChangeText}
    />
  );
};

export { Input };
