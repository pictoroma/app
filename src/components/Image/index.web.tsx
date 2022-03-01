import { ServerContext } from '#/context/server';
import styled from 'styled-components/native';
import React, { useContext, useEffect, useState } from 'react';
import { DeepPartial } from '#/helpers/types';
import { MediaModel } from '#/hooks/graphql';

const Wrapper = styled.View<{
  height: number;
}>`
  height: ${({ height }) => height}px;
`;
const ImageWrapper = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ccc;
`;


type Props = {
  media: DeepPartial<MediaModel>
}
const Image: React.FC<Props> = ({ media }) => {
  const { domain, token } = useContext(ServerContext);
  const [width, setWidth] = useState<number>(0);
  useEffect(
    () => {
      const run = async () => {
        const response = await fetch(`${domain}/api/thumb/${media.id!}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
        console.log(response.ok);
      };
      run();
    },
    [domain, token, media.id],
  );
  return (
    <Wrapper
      height={width / media.aspect!}
      onLayout={(evt) => {
        const currentWidth = evt.nativeEvent.layout.width;
        if (currentWidth !== width) {
          setWidth(currentWidth);
        }
      }}
    >
      <ImageWrapper
      />
    </Wrapper>
  )
};

export { Image };
