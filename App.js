import React from "react";
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Center,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Products from "./components/Products";
import Profile from "./components/Cart";
import { SafeAreaView } from "react-native-safe-area-context";
import DataContextProvider, { useDataContext } from "./contexts/DataContext";
import { FontAwesome5 } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Cart from "./components/Cart";
import About from "./components/About";
import LoadingScreen from "./components/LoadingScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  const { theme } = useDataContext();
  const { txt, primary } = theme;

  return (
    <Tab.Navigator
      barStyle={{
        margin: 8,
        backgroundColor: primary,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        initialParams={{
          path: "data",
          isRoot: true,
          HeaderName: "Product Type",
        }}
        options={{
          tabBarLabel: "Products",

          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="command"
              size={20}
              color={focused ? txt : "#cccccc"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarLabel: "My Cart",

          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="add-to-list"
              size={20}
              color={focused ? txt : "#cccccc"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="about"
        component={About}
        options={{
          tabBarLabel: "About",

          tabBarIcon: ({ color, focused }) => (
            <Entypo name="info" size={20} color={focused ? txt : "#cccccc"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  const { theme, isDataLoad } = useDataContext();
  const { nav } = theme;
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: "#d7cbf5",
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}
      >
        <HStack justifyContent={"center"} alignItems={"center"} p={2} space={2}>
          <FontAwesome5 name="store" size={16} color="#3f3f46" />
          <Text fontSize={"lg"} fontWeight={"bold"} color="#3f3f46">
            Khan Enterprise
          </Text>
        </HStack>
      </SafeAreaView>
      {isDataLoad ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="/" component={BottomTab} />
          <Stack.Screen name="Product-item" component={Products} />
        </Stack.Navigator>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <DataContextProvider>
          <MyStack />
        </DataContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
