import { useDataContext } from "../contexts/DataContext";
import { theme } from "../utils/StaticVariable";
import React, { useEffect, useState } from "react";
import { Text, VStack } from "../components/Elements";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, Button, Image } from "native-base";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { getDocumentData } from "../DB/Firebase_funtions";
import Loading from "../components/Loading";
import { ResetIcon } from "../components/Icons";

const { primaryBackgroundColor } = theme;

const BarCodeScan = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [delay, useDelay] = useState(false);
  const { setBarCode, colorScheme } = useDataContext();
  const { state } = route.params;

  useEffect(() => {
    setTimeout(() => {
      useDelay(true);
    }, 200);

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (state === "forAddItem") {
      setBarCode((prev) => ({ ...prev, addItem: data }));
      navigation.goBack();
    } else if (state === "forSearchItem") {
      const props = await getDocumentData(data);
      console.log(props);
      if (props) {
        setBarCode((prev) => ({
          ...prev,
          searchedItem: [...prev.searchedItem, { ...props }],
        }));
        navigation.goBack();
      } else {
        setError({ message: "No Product Found", ID: data });
      }
    }

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <VStack
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      bg={Colors[colorScheme].BoxBackground}
    >
      {delay && !scanned && (
        <BarCodeScanner
          style={[StyleSheet.absoluteFillObject]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          // barCodeTypes={[BarCodeScanner.Constants.BarCodeType]}
        />
      )}

      {error && (
        <VStack
          bg={Colors[colorScheme].BoxBackground}
          alignItems={"center"}
          space={2}
        >
          <Text fontSize={"xl"}>
            {/* {error.message} */}
            {"কোন প্রডাক্ট খুজে পাওয়া জায়নি"}
          </Text>
          <Text fontSize={"xl"}>
            {/* BarCode: {error.ID} */}
            {`বারকোড নম্বরঃ ${error.ID}`}
          </Text>
          <Button
            my={8}
            rightIcon={<ResetIcon size={"md"} />}
            variant={"ghost"}
            colorScheme={"gray"}
            _text={{ fontFamily: "exo", fontSize: "xl" }}
            onPress={() => {
              setError(null);
              setScanned(false);
            }}
          >
            {/* Scan Again */}
            {"পূনরায় স্কেন করুন"}
          </Button>
        </VStack>
      )}
      {scanned && !error && <Loading />}
      {!scanned && (
        <Image
          resizeMode={"contain"}
          source={require("../assets/barCodeBorder.png")}
          alt=""
        />
      )}
    </VStack>
  );
};

export default BarCodeScan;
