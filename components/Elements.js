import {
  HStack as H,
  VStack as V,
  Text as T,
  Input as I,
  Divider,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { useDataContext } from "../contexts/DataContext";

const HStack = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <H bg={Colors[colorScheme].background} alignItems={"center"} {...props} />
  );
};

const VStack = (props) => {
  const { colorScheme } = useDataContext();
  return <V bg={Colors[colorScheme].background} {...props} />;
};

const Text = (props) => {
  const { colorScheme } = useDataContext();
  return <T fontFamily={"exo"} color={Colors[colorScheme].text} {...props} />;
};

const BoldText = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <T fontFamily={"boldExo"} color={Colors[colorScheme].text} {...props} />
  );
};

const LightText = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <T
      fontFamily={"lightExo"}
      color={Colors[colorScheme].text}
      {...props}
      textAlign={"justify"}
    />
  );
};

const Input = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <I
      py={3}
      color={Colors[colorScheme].text}
      backgroundColor={Colors[colorScheme].BoxBackground}
      {...props}
      borderRadius={8}
      fontSize={"lg"}
      fontFamily={"exo"}
      borderWidth={0}
      _focus={{
        backgroundColor: Colors[colorScheme].BoxBackground,
        borderColor: "gray.200",
      }}
      {...props}
    />
  );
};

const MenuButton = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <TouchableOpacity {...props}>
      <HStack
        p={4}
        space={4}
        borderRadius={8}
        bg={Colors[colorScheme].BoxBackground}
      >
        <props.icon />
        <Divider orientation="vertical" />
        <Text fontSize={"lg"}>{props.children}</Text>
      </HStack>
    </TouchableOpacity>
  );
};

const CustomButton = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <TouchableOpacity {...props}>
      <HStack
        p={3}
        space={2}
        borderRadius={8}
        bg={"danger.600"}
        justifyContent={"center"}
      >
        <Text fontSize={"lg"} color={Colors[colorScheme].BoxBackground}>
          {props.children}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export {
  HStack,
  VStack,
  Text,
  BoldText,
  LightText,
  Input,
  MenuButton,
  CustomButton,
};
