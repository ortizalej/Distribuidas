import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import IngresosScreen from '../screens/Ingresos';
import EgresosScreen from '../screens/Egresos';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import TarjetasScreen from '../screens/Tarjetas';
import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Alejandro Ortiz"
};


function HomeStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );

}
function IngresosStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Ingresos"
        component={IngresosScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Ingresos" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function EgresosStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Egresos"
        component={EgresosScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Egresos" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function TarjetasStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Tarjetas"
        component={TarjetasScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Tarjetas" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );

}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          alignItems: 'center',
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Tarjetas"
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Ingresos"
        component={IngresosStack}
      />
      <Drawer.Screen
        name="Egresos"
        component={EgresosStack}
      />
      <Drawer.Screen
        name="Tarjetas"
        component={TarjetasStack}
      />
      <Drawer.Screen
        name="Cuentas bancarias"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Inversiones"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Prestamos"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Presupuestos"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Sign In"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Sign Up"
        component={HomeStack}
      />
    </Drawer.Navigator>
  );
}

export default function init(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}