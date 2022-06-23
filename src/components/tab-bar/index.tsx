import React from 'react';
import styled from 'styled-components/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { Body1 } from '#/typography';

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.shade};
  flex-direction: row;
  position: absolute;
  bottom: 25px;
  align-self: center;
  padding: ${({ theme }) => theme.margins.small}px;
  border-radius: 45px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
`;

const Button = styled.View<{
  focus: boolean;
}>`
  background-color: ${({ focus, theme }) =>
    focus ? theme.colors.primary : 'transparent'};
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
`;
const TabBar: React.FC<BottomTabBarProps> = ({
  navigation,
  state,
  descriptors,
}) => {
  const { routes } = state;

  return (
    <Wrapper>
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
          >
            <Button focus={isFocused}>
              {options.tabBarIcon({ focused: isFocused })}
            </Button>
          </TouchableOpacity>
        );
      })}
    </Wrapper>
  );
};

const TabBarSpacing = styled.View`
  height: ${({ theme }) => theme.margins.small * 2 + 100}px;
`;

export { TabBar, TabBarSpacing };
