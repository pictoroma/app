import React from 'react';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

const Wrapper = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const Activity = styled.ActivityIndicator`
  
`


const OverlayLoader: React.FC<{}> = () => (
  <Wrapper intensity={20}>
    <Activity /> 
  </Wrapper>
);

export { OverlayLoader };
