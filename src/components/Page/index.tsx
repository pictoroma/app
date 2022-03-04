import React, { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Platform } from 'react-native';
import { OverlayLoader } from '../loaders';

const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Pressable = styled.Pressable`
  flex: 1;
`;

type Props = {
  children: ReactNode;
  loading?: boolean;
}

const Page: React.FC<Props> = ({ children, loading }) => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    const keyboardDidShow = () => setKeyboardShown(true);
    const keyboardDidHide = () => setKeyboardShown(false);
    const show = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hide = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <Pressable disabled={!keyboardShown} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoiding behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {loading && <OverlayLoader />}
        {children}
      </KeyboardAvoiding>
    </Pressable>
  );
};

export { Page };
