import { useNavigation } from "@react-navigation/native";
import { IconButton } from "native-base";
import { BoldText, Text } from "../components/Elements";
import {
  AddItemsIcon,
  DashboardIcon,
  SearchIcon,
  SettingsIcon,
} from "../components/Icons";
import { Colors } from "../constants/Colors";

import Dashboard from "../screens/Dashboard";
import { AddProducts } from "../screens/AddItems";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/Settings";
import SearchedProducts from "../screens/SearchedProducts";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarLabelStyle: { marginBottom: 5, fontFamily: "exo" },
        tabBarStyle: { flex: 0.06 },
        tabBarHideOnKeyboard: true,
        lazy: false,
      }}
      initialRouteName={"Memo"}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
          headerTitle: () => (
            <BoldText fontSize={"2xl"}>খান এন্টারপ্রাইস</BoldText>
          ),
          headerRight: () => (
            <IconButton
              colorScheme={"gray"}
              onPress={() => navigation.navigate("Search Product")}
              icon={<SearchIcon size={"lg"} />}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search Product"
        component={SearchedProducts}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          headerTitle: () => (
            <BoldText fontSize={"2xl"}>প্রোডাক্ট খুজুন</BoldText>
          ),
        }}
      />

      <BottomTab.Screen
        name="Add Item"
        component={AddProducts}
        options={{
          tabBarIcon: ({ color }) => <AddItemsIcon color={color} />,
          headerTitle: () => (
            <BoldText fontSize={"2xl"}>নতুন প্রোডাক্ট যোগ করুন</BoldText>
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          headerTitle: () => <BoldText fontSize={"2xl"}>সেটিংস</BoldText>,
          headerRight: () => (
            <IconButton
              colorScheme={"gray"}
              onPress={() => navigation.navigate("Search Product")}
              icon={<SearchIcon size={"lg"} />}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
