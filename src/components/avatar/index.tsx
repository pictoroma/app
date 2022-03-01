import styled from 'styled-components/native';
import { Icon } from '../Icon';
import { Image } from '../Image';

type Props = {
  mediaId?: string;
  onPress?: () => void;
}

const Touchable = styled.TouchableOpacity``;
const Wrapper = styled.View`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`

const Avatar: React.FC<Props> = ({
  mediaId,
  onPress,
}) => {
  const content = (
    <Wrapper>
      {mediaId ? (
        <Image media={{ aspect: 1, id: mediaId }} />
      ) : (
        <Icon name="user" />
      )}
    </Wrapper>
  );

  if (onPress) {
    return (
      <Touchable onPress={onPress}>
        {content}
      </Touchable>
    );
  }
  return content;
}

export { Avatar }
