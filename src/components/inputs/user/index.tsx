import { Row } from '#/components/Row';
import { Dialog } from '#/components/Dialog';
import { PartialDeep } from 'type-fest';
import { UserModel } from '#/hooks/graphql';
import { Body1 } from '#/typography';
import { useState } from 'react';

type UserInputProps = {
  label: string;
  users: PartialDeep<UserModel>[];
  selected?: PartialDeep<UserModel>;
  onSelect: (user?: PartialDeep<UserModel>) => void;
};

const UserInput: React.FC<UserInputProps> = ({
  label,
  users,
  selected,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Row overline={label} onPress={() => setVisible(true)}>
        <Body1>{selected?.name || selected?.username || 'Select'}</Body1>
      </Row>
      <Dialog
        visible={visible}
        selected={selected}
        onClose={() => setVisible(false)}
        items={users || []}
        getKey={item => item.id}
        onSelect={onSelect}
        renderSelect={item => <Row title={item.name || item.username} />}
      />
    </>
  );
};

export { UserInput };
