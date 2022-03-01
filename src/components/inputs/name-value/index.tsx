import { Row, Dialog } from "#/components";
import { Body1 } from "#/typography";
import { useState } from "react";

type NameValueInputItem = {
  key: string;
  value: any;
}

type NameValueInputProps = {
  label: string;
  items: NameValueInputItem[];
  selected?: NameValueInputItem;
  onSelect: (item?: NameValueInputItem) => void;
}

const NameValueInput: React.FC<NameValueInputProps> = ({
  label,
  items,
  selected,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Row overline={label} onPress={() => setVisible(true)}>
        <Body1>{selected?.key || 'Select'}</Body1>
      </Row>
      <Dialog
        visible={visible}
        selected={selected}
        onClose={() => setVisible(false)}
        items={items}
        getKey={item => item.key}
        onSelect={onSelect}
        renderSelect={(item) => (
          <Row
            title={item.key}
          />
        )}
      />
    </>
  );
}

export { NameValueInputItem, NameValueInput };
