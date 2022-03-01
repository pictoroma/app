import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { UploadFile } from '#/hooks/posts';
import { Icon } from '#/components';
import { Row } from '../Row';

type Props = {
  files: UploadFile[];
  onUpdate: (files: UploadFile[]) => void;
};

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Spacer = styled.View`
  padding-bottom: 100%;
`;

const Item = styled.View`
  width: 33%;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  left: 0px;
  bottom: 5px;
  right: 10px;
  justify-content: center;
  align-items: center;
  background: #ddd;
  border-radius: 5px;
`;

const ImageWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  left: 0px;
  bottom: 5px;
  right: 10px;
`;

const AddImages: React.FC<Props> = ({ files, onUpdate }) => {
  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (result.cancelled || !result.base64) {
      return;
    }
    let [filename] = result.uri.split('/');
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : 'image';

    const file = {
      type,
      name: filename,
      uri: result.uri,
    };
    onUpdate([...files, file]);
  }, [files, onUpdate]);

  const remove = useCallback(
    (file: UploadFile) => {
      onUpdate(files.filter(f => f !== file));
    },
    [files, onUpdate]
  );

  return (
    <Row>
      <Wrapper>
        {files.map(m => (
          <Item key={m.uri}>
            <Spacer />
            <ImageWrapper onPress={() => remove(m)}>
              <Image source={{ uri: m.uri }} />
            </ImageWrapper>
          </Item>
        ))}
        <Item>
          <Spacer />
          <Button onPress={pickImage}>
            <Icon name="plus-circle" size={40} />
          </Button>
        </Item>
      </Wrapper>
    </Row>
  );
};

export { AddImages };
