import { useNavigation } from "@react-navigation/native";
import { Box, Button, Image } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

import {
  Text,
  VStack,
  HStack,
  LightText,
  BoldText,
  CustomButton,
} from "./Elements";
import { Colors } from "../constants/Colors";
import { useDataContext } from "../contexts/DataContext";
import { PlusIcon } from "./Icons";

const Product = ({ props, setResult }) => {
  const { colorScheme, setBarCode } = useDataContext();
  const navigation = useNavigation();
  const { name, sellPrice, unit } = props;
  return (
    <TouchableOpacity
      style={{ width: "50%", padding: 6 }}
      w={"50%"}
      onPress={() =>
        navigation.navigate("other", {
          screen: "productPage",
          params: { ...props },
        })
      }
    >
      <VStack
        p={4}
        space={4}
        borderRadius={8}
        bg={Colors[colorScheme].BoxBackground}
      >
        <Image
          alt="Product"
          w={"100%"}
          h={24}
          resizeMode={"contain"}
          source={require("../assets/product.png")}
        />
        <VStack bg={Colors[colorScheme].BoxBackground}>
          <Text noOfLines={1}>{name}</Text>
          {/* <LightText noOfLines={1}>{`Brand : ${props.brand}`}</LightText> */}
          <HStack
            alignItems={"flex-end"}
            bg={Colors[colorScheme].BoxBackground}
          >
            <BoldText fontSize={"lg"} noOfLines={1}>
              {`৳${sellPrice}`}
            </BoldText>
            <LightText noOfLines={1}>{`/${unit}`}</LightText>
          </HStack>
        </VStack>
        {/* <Button
          colorScheme={"danger"}
          borderRadius={8}
          _text={{ fontFamily: "exo", fontSize: "md" }}
          onPress={() => {
            console.log("start");
            // setBarCode((prev) => ({
            //   ...prev,
            //   searchedItem: [...prev.searchedItem, props],
            // }));
            setResult && setResult([]);
            console.log("end");
          }}
        >
          যোগ করুন
        </Button> */}
        <CustomButton
          icon={PlusIcon}
          onPress={() => {
            console.log("start");
            setBarCode((prev) => ({
              ...prev,
              searchedItem: [...prev.searchedItem, props],
            }));
            setResult && setResult([]);
            console.log("end");
          }}
        >
          যোগ করুন
        </CustomButton>
      </VStack>
    </TouchableOpacity>
  );
};

export default Product;
