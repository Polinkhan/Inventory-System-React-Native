import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Text, VStack, HStack, LightText, BoldText } from "./Elements";
import { Colors } from "../constants/Colors";
import { useDataContext } from "../contexts/DataContext";
import { ResetIcon, TrashIcon } from "./Icons";

const ProductInList = ({ props, index }) => {
  const { colorScheme, barCode, setBarCode } = useDataContext();
  const navigation = useNavigation();
  const { name, sellPrice, unit } = props;
  const { searchedItem } = barCode;
  return (
    <TouchableOpacity
      style={{ width: "100%", padding: 6 }}
      w={"50%"}
      onPress={() =>
        navigation.navigate("other", {
          screen: "productPage",
          params: { ...props },
        })
      }
    >
      <HStack p={2} borderRadius={8} bg={Colors[colorScheme].BoxBackground}>
        <HStack bg={Colors[colorScheme].BoxBackground} space={3}>
          <Image
            alt="Product"
            flex={0.2}
            h={16}
            resizeMode={"contain"}
            source={require("../assets/product.png")}
          />

          <VStack bg={Colors[colorScheme].BoxBackground} flex={0.65}>
            <Text fontSize={"lg"} noOfLines={1}>
              Name : {name}
            </Text>
            <Text fontSize={"lg"} noOfLines={1}>
              Price : {`${sellPrice} taka/${unit}`}
            </Text>
            {/* <LightText noOfLines={1}>{`Brand : ${props.brand}`}</LightText> */}
          </VStack>
        </HStack>
        <IconButton
          icon={<TrashIcon />}
          colorScheme={"red"}
          size={"lg"}
          onPress={() => {
            const newArray = [...searchedItem];
            newArray.splice(index, 1);
            setBarCode((prev) => ({ ...prev, searchedItem: newArray }));
          }}
        />
      </HStack>
    </TouchableOpacity>
  );
};

export default ProductInList;