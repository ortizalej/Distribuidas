import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from '../screens/Home';
import PresupuestoScreen from '../screens/Presupuesto'
import IngresosScreen from '../screens/Ingresos';
import EgresosScreen from '../screens/Egresos';
import TarjetasScreen from '../screens/Tarjetas';
import PrestamosScreen from '../screens/Prestamos';
import CuentaScreen from '../screens/CuentaBancaria'
import AgregarTarjetas from '../screens/AddTarjetas'
import LoginScreen from '../screens/Login'
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

function LoginStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Login" scene={scene} navigation={navigation} />
          )
        }}

      />
    </Stack.Navigator>
  );
}

function SingInStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Sign In"
        component={LoginScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Sing In" scene={scene} navigation={navigation} />
          )
        }}

      />
    </Stack.Navigator>
  );
}

function PresupuestoStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Presupuesto"
        component={PresupuestoScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Presupuesto" scene={scene} navigation={navigation} />
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

function PrestamosStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Prestamos"
        component={PrestamosScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Prestamos" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}
function CuentaStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Cuenta Bancaria"
        component={CuentaScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Cuenta Bancaria" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}



function AgregarTarjetasStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="AgregarTarjeta"
        component={AgregarTarjetas}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="AgregarTarjeta" scene={scene} navigation={navigation} />
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
      initialRouteName="Home"
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
        component={CuentaStack}
      />
      <Drawer.Screen
        name="Inversiones"
        component={HomeStack}
      />
      <Drawer.Screen
        name="Login"
        component={LoginStack}
      />
      <Drawer.Screen
        name="Prestamos"
        component={PrestamosStack}
      />
      <Drawer.Screen
        name="Presupuestos"
        component={PresupuestoStack}
      />
      <Drawer.Screen
        name="Agregar Tarjeta"
        component={AgregarTarjetasStack}
      />
      <Drawer.Screen
        name="Sign In"
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