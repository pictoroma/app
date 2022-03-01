import { Row, Dialog } from '#/components';
import { DeepPartial } from '#/helpers/types';
import { FeedModel } from '#/hooks/graphql';
import { Body1 } from '#/typography';
import { useState } from 'react';

type FeedInputProps = {
  label: string;
  feeds: DeepPartial<FeedModel>[];
  selected?: DeepPartial<FeedModel>;
  onSelect: (feed?: DeepPartial<FeedModel>) => void;
};

const FeedInput: React.FC<FeedInputProps> = ({
  label,
  feeds,
  selected,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Row overline={label} onPress={() => setVisible(true)}>
        <Body1>{selected?.name || 'Select'}</Body1>
      </Row>
      <Dialog
        visible={visible}
        selected={selected}
        onClose={() => setVisible(false)}
        items={feeds || []}
        getKey={item => item.id}
        onSelect={onSelect}
        renderSelect={item => <Row title={item.name} />}
      />
    </>
  );
};

export { FeedInput };
