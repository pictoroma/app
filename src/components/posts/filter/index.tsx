import { Button } from '#/components/Button';
import { Icon } from '#/components/Icon';
import { Popup } from '#/components/Popup';
import { Cell, Row } from '#/components/Row';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Content = styled.View`
  min-height: 40%;
`;

interface PostFilterProps {
  selected?: string[];
  feeds?: {
    id: string;
    name: string;
  }[];
  onSelect: (ids: string[]) => void;
}
const PostFilter: React.FC<PostFilterProps> = ({
  selected = [],
  feeds = [],
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Cell onPress={() => setVisible(true)}>
        <Icon name="filter" color={selected.length > 0 ? 'primary' : 'text'} />
      </Cell>
      <Popup visible={visible} onClose={() => setVisible(false)}>
        {feeds.map(feed => {
          const isSelected = selected.includes(feed.id);
          return (
            <Row
              key={feed.id}
              onPress={
                isSelected
                  ? () => onSelect(selected.filter(s => s !== feed.id))
                  : () => onSelect([...selected, feed.id])
              }
              left={
                <Cell>
                  <Icon name={isSelected ? 'check-circle' : 'circle'} />
                </Cell>
              }
              title={feed.name}
            />
          );
        })}
        {selected.length > 0 && (
          <Row>
            <Button title="Clear" onPress={() => onSelect([])} />
          </Row>
        )}
      </Popup>
    </>
  );
};

export { PostFilter };
