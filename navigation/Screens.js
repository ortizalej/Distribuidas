import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from '../screens/Home';
import PresupuestoScreen from '../screens/Presupuesto'
import ConfiguracionScreen from '../screens/Configuracion'
import IngresosScreen from '../screens/Ingresos';
import EgresosScreen from '../screens/Egresos';
import TarjetasScreen from '../screens/Tarjetas';
import PrestamosScreen from '../screens/Prestamos';
import CuentaScreen from '../screens/CuentaBancaria'
import AgregarTarjetas from '../screens/AddTarjetas'
import LoginScreen from '../screens/Login'
import SignInScreen from '../screens/SingIn'
import InversionesScreen from '../screens/Inversiones'
import CustomDrawerContent from './Menu';
import ImageViewerScreen from '../screens/ImageViewer'
import { Icon, Header } from '../components';
import { materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Login"
        component={LoginRedirect}
      />
      <Drawer.Screen
        name="Home"
        component={AppStack}
      />
      <Drawer.Screen
        name="Sign In"
        component={SingInStack}
      />
    </Drawer.Navigator>
  );
}

function LoginRedirect() {
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
  )
}

function PresupuestoStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Presupuesto"
        component={PresupuestoScreen}
        initialParams={user.route.params}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Presupuesto" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ConfiguracionStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Configuracion"
        component={ConfiguracionScreen}
        initialParams={user.route.params}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Configuracion" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function IngresosStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Ingresos"
        component={IngresosScreen}
        initialParams={user.route.params}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Ingresos" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function EgresosStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Egresos"
        component={EgresosScreen}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Egresos" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function TarjetasStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Tarjetas"
        component={TarjetasScreen}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Tarjetas" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function PrestamosStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Prestamos"
        initialParams={user.route.params}

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
function CuentaStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Cuenta Bancaria"
        component={CuentaScreen}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Cuenta Bancaria" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AgregarTarjetasStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Agregar Tarjetas"
        component={AgregarTarjetas}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Agregar Tarjetas" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AgregarImageViewerStack() {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewerScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="ImageViewer" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function InversionesStack(user) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Inversiones"
        component={InversionesScreen}
        initialParams={user.route.params}

        options={{
          header: ({ navigation, scene }) => (
            <Header title="Inversiones" scene={scene} navigation={navigation} />
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
        name="Sing In"
        component={SignInScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Sign In" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );

}

function AppStack(props) {
  let user = props.route.params.seguridad
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          user={user}
        />
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
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Ingresos"
        component={IngresosStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Egresos"
        component={EgresosStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
        listeners
      />
      <Drawer.Screen
        name="Tarjetas"
        component={TarjetasStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Cuentas bancarias"
        component={CuentaStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Inversiones"
        component={InversionesStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Prestamos"
        component={PrestamosStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Presupuestos"
        component={PresupuestoStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Agregar Tarjeta"
        component={AgregarTarjetasStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="ImageViewer"
        component={AgregarImageViewerStack}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Sign In"
        component={SingInStack}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={ConfiguracionStack}
        options={{ unmountOnBlur: true }}
        initialParams={user}
      />
      <Drawer.Screen
        name="Cerrar Sesion"
        component={LoginStack}
        options={{ unmountOnBlur: true }}
      />

    </Drawer.Navigator>
  );
}

export default function init(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={LoginStack} />
    </Stack.Navigator>
  );
}