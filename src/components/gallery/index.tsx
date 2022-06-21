import styled, { ThemeProvider } from 'styled-components/native';
import ImageView from 'react-native-image-viewing';
import { DeepPartial } from '#/helpers/types';
import { MediaModel } from '#/hooks/graphql';
import { Image } from '../Image';
import { Cell, Row } from '../Row';
import React, { useContext, useMemo, useState } from 'react';
import { ServerContext } from '#/context/server';
import { Icon } from '../Icon';
import { dark } from '#/theme';
import { useSaveImage } from './save';

const ScrollWrapper = styled.ScrollView<{
  height: number;
}>`
  height: ${({ height }) => height}px;
  width: 100%;
`;

const ScrollContent = styled.View`
  flex-direction: row;
`;

const Touchable = styled.TouchableWithoutFeedback``;

const ScrollPage = styled.View<{
  width: number;
}>`
  width: ${({ width }) => width}px;
`;

const Wrapper = styled.View`
  border-radius: 5px;
  overflow: hidden;
`;

type PagerProps = {
  current: number;
  total: number;
};

const DotWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Dot = styled.View<{
  selected: boolean;
}>`
  width: 6px;
  height: 6px;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : '#ccc'};
  margin: 0 5px;
  border-radius: 3px;
`;

const Pager: React.FC<PagerProps> = ({ current, total }) => {
  const dots = useMemo(
    () => new Array(total).fill(undefined).map((_, i) => i),
    [total]
  );

  return (
    <DotWrapper>
      {dots.map(i => (
        <Dot key={i} selected={i === current} />
      ))}
    </DotWrapper>
  );
};

type GalleryProps = {
  media: DeepPartial<MediaModel[]>;
};

const Gallery: React.FC<GalleryProps> = ({ media }) => {
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const saveImage = useSaveImage();
  const { domain, token } = useContext(ServerContext);
  const currentIndex = useMemo(
    () => Math.round(offset / width) || 0,
    [offset, width]
  );
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const lightboxImages = useMemo(
    () =>
      media.map(item => ({
        uri: `${domain}/api/media/${item?.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })),
    [domain, token, media]
  );
  const currentMedia = useMemo(
    () => media[currentIndex],
    [media, currentIndex]
  );
  const currentAspect = useMemo(
    () => currentMedia?.aspect || 1, // use current media aspect
    [currentMedia]
  );

  if (media.length === 0) {
    return <></>;
  }
  const Lightbox = () => (
    <ImageView
      images={lightboxImages}
      imageIndex={currentIndex}
      visible={lightboxVisible}
      onRequestClose={() => setLightboxVisible(false)}
      FooterComponent={() => (
        <ThemeProvider theme={dark}>
          <Row
            right={
              <Cell onPress={() => saveImage(lightboxImages[currentIndex].uri)}>
                <Icon name="download" />
              </Cell>
            }
          />
          <Row />
        </ThemeProvider>
      )}
    />
  );
  if (media.length === 1) {
    return (
      <Row>
        <Lightbox />
        <Touchable onPress={() => setLightboxVisible(true)}>
          <Wrapper>
            <Image media={media[0]!} />
          </Wrapper>
        </Touchable>
      </Row>
    );
  }

  return (
    <Row>
      <Lightbox />
      <Wrapper>
        <ScrollWrapper
          horizontal
          scrollEventThrottle={16}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToAlignment="center"
          disableIntervalMomentum
          height={width / currentAspect}
          onScroll={evt => {
            const offset = evt.nativeEvent.contentOffset.x;
            setOffset(offset);
          }}
          onLayout={evt => {
            const currentWidth = evt.nativeEvent.layout.width;
            if (currentWidth !== width) {
              setWidth(currentWidth);
            }
          }}
        >
          <Touchable onPress={() => setLightboxVisible(true)}>
            <ScrollContent>
              {media.map(item => (
                <ScrollPage key={item!.id} width={width}>
                  <Image media={item!} />
                </ScrollPage>
              ))}
            </ScrollContent>
          </Touchable>
        </ScrollWrapper>
      </Wrapper>
      <Pager current={currentIndex} total={media.length} />
    </Row>
  );
};

export { Gallery };
