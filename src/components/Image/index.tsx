import { ServerContext } from '#/context/server';
import styled from 'styled-components/native';
import React, { useContext, useState } from 'react';
import { DeepPartial } from '#/helpers/types';
import { MediaModel } from '#/hooks/graphql';

const Wrapper = styled.View<{
  height: number;
}>`
  height: ${({ height }) => height}px;
  width: 100%;
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
  media: DeepPartial<MediaModel>;
};
const Image: React.FC<Props> = ({ media }) => {
  const { domain, token } = useContext(ServerContext);
  const [width, setWidth] = useState<number>(0);
  return (
    <Wrapper
      height={width / media.aspect!}
      onLayout={evt => {
        const currentWidth = evt.nativeEvent.layout.width;
        if (currentWidth !== width) {
          setWidth(currentWidth);
        }
      }}
    >
      {!!width && (
        <ImageWrapper
          source={{
            uri: `${domain}/api/thumb/${media.id!}?width=${width * 2}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
        />
      )}
    </Wrapper>
  );
};

export { Image };
