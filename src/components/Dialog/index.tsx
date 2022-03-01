import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Popup } from '#/components/Popup';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Input } from '#/components/Input';
import { Row } from '#/components/Row';
import { Button } from '#/components/Button';

interface Props<T> {
  visible: boolean;
  onClose: () => void;
  selected?: T;
  allowClear?: boolean;
  items: T[];
  onSelect: (item?: T) => void;
  renderSelect: (item: T) => ReactNode;
  getKey: (item: T) => any;
  search?: (term: string, items: T[]) => T[];
  create?: (term: string) => Promise<T>;
}

const Touch = styled.TouchableOpacity``;
const Content = styled.View`
  min-height: 40%;
`;

function Dialog<T>({
  visible,
  onClose,
  items,
  onSelect,
  renderSelect,
  getKey,
  search,
  create,
  allowClear,
}: Props<T>) {
  const [searchInput, setSeachInput] = useState('');
  const results = useMemo(() => {
    if (!search || !searchInput) {
      return items;
    }
    return search(searchInput, items);
  }, [items, searchInput, search]);
  const hide = useCallback(() => {
    setSeachInput('');
    onClose();
  }, [setSeachInput, onClose]);

  const select = useCallback(
    (item: T) => {
      onSelect(item);
      hide();
    },
    [onSelect, hide]
  );
  const createItem = useCallback(async () => {
    if (!create) {
      return;
    }
    const item = await create(searchInput);
    onSelect(item);
    hide();
  }, [create, searchInput, hide]);
  return (
    <Popup visible={visible} onClose={hide}>
      {search && (
        <Row>
          <Input
            label="Search"
            value={searchInput}
            onChangeText={setSeachInput}
          />
        </Row>
      )}
      <Content>
        {create && results.length === 0 && searchInput && (
          <Row>
            <Button title={`Create ${searchInput}`} onPress={createItem} />
          </Row>
        )}
        {results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={getKey}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <Touch onPress={() => select(item)}>{renderSelect(item)}</Touch>
            )}
          />
        )}
        {allowClear && (
          <Row>
            <Button title="Clear" onPress={() => select(undefined)} />
          </Row>
        )}
      </Content>
    </Popup>
  );
}

export { Dialog };
