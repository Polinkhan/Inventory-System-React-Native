import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Text } from "../components/Elements";
import BarCodeScanner from "../screens/BarCodeScan";
import DarkMode from "../screens/DarkMode";
import ProductPage from "../screens/ProductPage";

// import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="other" component={OtherNavigator} />
      {/* <Stack.Screen name="productPage" component={ProductPage} /> */}
      {/* <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
    </Stack.Navigator>
  );
}

const Stack2 = createNativeStackNavigator();

function OtherNavigator() {
  return (
    <Stack2.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
      <Stack2.Screen
        name="barCodeScan"
        component={BarCodeScanner}
        options={({ route }) => ({
          headerTitle: () => <Text fontSize={"xl"}>{route.params.header}</Text>,
        })}
      />
      <Stack2.Screen
        name="productPage"
        component={ProductPage}
        options={({ route }) => ({
          headerTitle: () => <Text fontSize={"xl"}>{route.params.name}</Text>,
        })}
      />
      <Stack2.Screen
        name="darkmode"
        component={DarkMode}
        options={({ route }) => ({
          headerTitle: () => <Text fontSize={"xl"}>{route.params.header}</Text>,
        })}
      />
    </Stack2.Navigator>
  );
}
