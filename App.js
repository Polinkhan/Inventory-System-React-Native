import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme, View } from "react-native";
import { useFonts } from "expo-font";
// import { StatusBar } from "native-base";
import { Colors } from "./constants/Colors";
import { Box } from "native-base";
import DataContextProvider, { useDataContext } from "./contexts/DataContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    exo: require("./assets/fonts/static/Exo2-Regular.ttf"),
    boldExo: require("./assets/fonts/static/Exo2-Bold.ttf"),
    lightExo: require("./assets/fonts/static/Exo2-Light.ttf"),
  });
  const isLoadingComplete = useLoadedAssets();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <DataContextProvider>
        <Root />
      </DataContextProvider>
    );
  }
}

const Root = () => {
  const { colorScheme } = useDataContext();
  console.log(colorScheme);
  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Navigation />
    </SafeAreaProvider>
  );
};

// function MyStack() {
//   const { currentUser } = useDataContext();
//   const { primaryColor, primaryOpacityColor } = theme;
//   const Stack = createNativeStackNavigator();

//   return (
//     fontsLoaded && (
//       <>
//         <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: false,
//             animation: "slide_from_right",
//           }}
//         >
//           {currentUser ? (
//             <>
//               <Stack.Screen name="/" component={BottomTab} />
//               <Stack.Screen
//                 name="categoryproduct"
//                 component={CategoryProducts}
//               />
//               {/* <Stack.Screen name="profile" component={Profile} />
//               <Stack.Screen name="password" component={ChangePassword} />
//               <Stack.Screen name="report" component={Report} />
//               <Stack.Screen
//                 name="profilePicture"
//                 component={ChangeProfilePicture}
//               /> */}
//             </>
//           ) : (
//             <Stack.Screen name="signin" component={SignIn} />
//           )}
//         </Stack.Navigator>
//       </>
//     )
//   );
// }

// const BottomTab = () => {
//   const Tab = createMaterialBottomTabNavigator();
//   const { primaryColor } = theme;

//   const tabs = [
//     {
//       route: "dashboard",
//       label: "Dashboard",
//       iconProvider: MaterialIcons,
//       iconName: "dashboard",
//       component: Dashboard,
//     },
//     {
//       route: "category",
//       label: "Category",
//       iconProvider: MaterialIcons,
//       iconName: "category",
//       component: Catagory,
//     },
//     {
//       route: "search",
//       label: "Search Product",
//       iconProvider: Feather,
//       iconName: "search",
//       component: Search,
//       // barColor: "#6F0880",
//     },
//     {
//       route: "cart",
//       label: "Cart",
//       iconProvider: Ionicons,
//       iconName: "cart",
//       component: Cart,
//     },
//     {
//       route: "additems",
//       label: "Add Items",
//       iconProvider: Entypo,
//       iconName: "add-to-list",
//       component: AddItems,
//     },
//   ];

//   return (
//     <Tab.Navigator
//       activeColor={primaryColor}
//       inactiveColor={"#aaaaaa"}
//       sceneAnimationEnabled={true}
//       barStyle={{ backgroundColor: "white" }}
//     >
//       {tabs.map((_, i) => (
//         <Tab.Screen
//           key={i}
//           name={_.route}
//           component={_.component}
//           options={{
//             // activeTintColor: primaryColor,
//             tabBarLabel: _.label,
//             tabBarColor: _.barColor,
//             tabBarIcon: ({ focused, color }) => (
//               <_.iconProvider name={_.iconName} size={20} color={color} />
//             ),
//           }}
//         />
//       ))}
//     </Tab.Navigator>
//   );
// };
