import React from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";


function CustomDrawerContent({
  drawerPosition,
  navigation,
  focused,
  state,
  user,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Ingresos",
    "Egresos",
    "Tarjetas",
    "Cuentas bancarias",
    "Inversiones",
    "Prestamos",
    "Presupuestos",
    "Configuracion",
    "Cerrar Sesion"
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <Block style={styles.profile}>
          <Image source={require('../assets/images/userImage.png')} style={styles.avatar} />
          <Text h5 color={"white"}>
            {user.name + " " + user.lastName}
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                user = {user}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}

        </ScrollView>
      </Block>

    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091A2B'
  },
  header: {
    backgroundColor: '#091A2B',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
    marginLeft: 50
  },
  avatar: {
    marginLeft: 20,
    marginTop: 15,
    height: 90,
    width: 90,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE
  }
});

export default CustomDrawerContent;
