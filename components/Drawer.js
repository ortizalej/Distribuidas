import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";

const proScreens = [
  "Ingresos",
  "Man",
  "Kids",
  "New Collection",
  "Sign In",
  "Sign Up"
];

const color = "#F42D1F";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;
    switch (title) {
      case "Home":
        return (
          <Icon
            size={16}
            name="shop"
            family="GalioExtra"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Ingresos":
        return (
          <Icon
            size={16}
            name="md-woman"
            family="ionicon"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Egresos":
        return (
          <Icon
            size={16}
            name="man"
            family="entypo"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Tarjetas":
        return (
          <Icon
            size={16}
            name="Ingresos"
            family="GalioExtra"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Cuentas bancarias":
        return (
          <Icon
            size={16}
            name="grid-on"
            family="material"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Inversiones":
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Prestamos":
        return (
          <Icon
            size={16}
            name="gears"
            family="font-awesome"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Presupuestos":
        return (
          <Icon
            size={16}
            name="md-switch"
            family="ionicon"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      case "Cerrar Sesion":
        return (
          <Icon
            size={16}
            name="ios-log-in"
            family="ionicon"
            color={focused ? color : materialTheme.COLORS.MUTED}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;
    return (
      <TouchableOpacity style={{ height: 55 }} onPress={() => {navigation.navigate(title)}}>
        <Block 
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null
          ]}
        >
          <Block middle flex={0.1} style={{ marginRight: 28 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={18}
              color={
                focused
                  ? color
                  : "white"
              }
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: '#091A2B',
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  }
});
