import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
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
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Navigation />
    </SafeAreaProvider>
  );
};
