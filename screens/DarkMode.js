import { Box, Pressable, Radio } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MenuButton, Text, VStack } from "../components/Elements";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../constants/Colors";
import { useDataContext } from "../contexts/DataContext";
import { async } from "@firebase/util";

const DarkMode = ({ navigation }) => {
  const { colorScheme, setColorScheme } = useDataContext();
  const [value, setValue] = React.useState(colorScheme);

  const handleChange = async (e) => {
    if (e === "system") {
      await SecureStore.deleteItemAsync("colorScheme");
    } else {
      await SecureStore.setItemAsync("colorScheme", e);
      setColorScheme(e);
      setValue(e);
    }
  };

  return (
    <VStack h={"100%"} p={4} space={4}>
      <Radio.Group
        name="myRadioGroup"
        value={value}
        colorScheme={"gray"}
        onChange={handleChange}
      >
        <VStack space={4}>
          <Box px={3}>
            <Radio value="dark">
              <Text fontSize={"lg"} w={"90%"} py={3}>
                On
              </Text>
            </Radio>
          </Box>

          <Box px={3}>
            <Radio value="light">
              <Text fontSize={"lg"} w={"80%"} py={3}>
                Off
              </Text>
            </Radio>
          </Box>

          <Box px={3}>
            <Radio value="system">
              <Text fontSize={"lg"} w={"80%"} py={3}>
                System
              </Text>
            </Radio>
          </Box>
        </VStack>
      </Radio.Group>
    </VStack>
  );
};

export default DarkMode;
