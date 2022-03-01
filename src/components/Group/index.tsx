import React, { Fragment, ReactNode, useState } from 'react';
import { Icon } from '#/components/Icon';
import { Header } from '#/components/Row/Header';
import styled from 'styled-components/native';
import { Row, Cell } from '#/components/Row';
import { Body1 } from '#/typography';

interface ListProps<T> {
  title: string;
  items: T[];
  getKey: (item: T) => any;
  render: (item: T) => ReactNode;
  add?: () => void;
}

interface ChildProps {
  title: string;
  add?: () => void;
  children?: ReactNode;
}

const Wrapper = styled.View`
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.background};
  shadow-offset: 0px;
  shadow-opacity: 0.1;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-radius: 5px;
`;

function Group<T = any>(props: ListProps<T> | ChildProps) {
  const [visible, setVisible] = useState(true);
  const { title, items, getKey, render, add, children } =
    props as ListProps<T> & ChildProps;
  return (
    <Row>
      <Wrapper>
        <Header
          left={
            <Icon name={visible ? 'chevron-down' : 'chevron-up'} size={18} />
          }
          title={title}
          add={add}
          onPress={() => setVisible(!visible)}
        />
        {visible &&
          items &&
          items.map(item => (
            <Fragment key={getKey(item)}>{render(item)}</Fragment>
          ))}
        {visible && children}
        {visible && !children && (!items || items.length === 0) && (
          <Row
            left={
              <Cell>
                <Icon color="textShade" name="maximize" />
              </Cell>
            }
          >
            <Body1 style={{ marginLeft: 10 }} color="textShade">
              Empty
            </Body1>
          </Row>
        )}
      </Wrapper>
    </Row>
  );
}

export { Group };
