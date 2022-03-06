import React, { useState, useEffect, ReactNode } from 'react';
import * as Sentry from 'sentry-expo';
import styled from 'styled-components/native';
import { Keyboard, Platform } from 'react-native';
import { OverlayLoader } from '../loaders';
import errorImage from '#/../assets/images/error.png';
import { Body1, Overline } from '#/typography';
import { Button } from '../Button';

const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Pressable = styled.Pressable`
  flex: 1;
`;

const ErrorWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ErrorImage = styled.Image`
  width: 150px;
  height: 150px;
`;

type Props = {
  children: ReactNode;
  loading?: boolean;
};

type ErrorBoundState = {
  hasError: boolean;
  error?: any;
};

type ErrorBoundProps = {
  children: ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundProps, ErrorBoundState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    Sentry.Native.captureException(error, {
      extra: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <ErrorImage source={errorImage} />
          <Body1>An error has occured</Body1>
          <Overline>{this.state.error?.toString()}</Overline>
          <Button
            onPress={() => this.setState({ hasError: false, error: undefined })}
            title="Retry"
          />
        </ErrorWrapper>
      );
    }
    return this.props.children;
  }
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
        <ErrorBoundary>{children}</ErrorBoundary>
      </KeyboardAvoiding>
    </Pressable>
  );
};

export { Page };
