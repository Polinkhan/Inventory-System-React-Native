import {
  Box,
  Button,
  Center,
  Divider,
  IconButton,
  Image,
  MinusIcon,
} from "native-base";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import {
  BoldText,
  HStack,
  LightText,
  Text,
  VStack,
} from "../components/Elements";
import { EyeOffIcon, EyeOnIcon, PlusIcon } from "../components/Icons";
import { Colors } from "../constants/Colors";
import { useDataContext } from "../contexts/DataContext";

const ProductPage = ({ route }) => {
  const [pricehide, setPricehide] = useState(true);
  const [cartNumber, setCartNumber] = useState(1);
  const { colorScheme } = useDataContext();

  const { name, sellPrice, unit, buyPrice } = route.params;
  return (
    <VStack h={"100%"} p={4} justifyContent={"space-between"}>
      <VStack space={4}>
        <BoldText fontSize={"2xl"}>{name}</BoldText>

        <Center bg={"gray.100"} borderRadius={8} shadow={1}>
          <Image source={require("../assets/product.png")} alt="" />
        </Center>

        <HStack justifyContent={"space-between"}>
          <BoldText fontSize={"xl"}>{`৳${sellPrice} ${unit}`}</BoldText>
          <LightText>{`Avaiable Item : ${null} pcs`}</LightText>
        </HStack>
        <Divider />
        <VStack space={2}>
          <Text fontSize={"xl"}>Product Details </Text>
          <LightText fontSize={"lg"}>¤ Name : {name}</LightText>
          <LightText fontSize={"lg"}>¤ Unit : Per {unit}</LightText>
          <LightText fontSize={"lg"}>¤ Price : {sellPrice} Taka</LightText>
          <HStack justifyContent={"space-between"}>
            <LightText fontSize={"lg"}>
              ¤ Buying Price : {pricehide ? "****" : buyPrice} Taka
            </LightText>
            <IconButton
              icon={
                pricehide ? (
                  <EyeOffIcon color={"gray.500"} />
                ) : (
                  <EyeOnIcon color={"gray.500"} />
                )
              }
              onPress={() => setPricehide((prev) => !prev)}
            />
          </HStack>
        </VStack>
        <VStack space={2}>
          <Text fontSize={"xl"}>Product Description </Text>
          <LightText>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.alteration in some form, by injected humour
          </LightText>
        </VStack>
      </VStack>
      <HStack
        bg={Colors[colorScheme].BoxBackground}
        p={2}
        borderRadius={8}
        justifyContent={"space-between"}
      >
        <HStack
          w={"30%"}
          bg={Colors[colorScheme].BoxBackground}
          justifyContent={"space-around"}
        >
          <IconButton
            icon={<MinusIcon color={"gray.600"} />}
            onPress={() =>
              cartNumber > 1 && setCartNumber((prev) => (prev -= 1))
            }
          />
          <Text fontSize={"xl"}>{cartNumber}</Text>
          <IconButton
            icon={<PlusIcon color={"gray.600"} />}
            onPress={() => setCartNumber((prev) => (prev += 1))}
          />
        </HStack>
        <Button
          colorScheme={"red"}
          borderRadius={8}
          _text={{ fontFamily: "exo", fontSize: "md" }}
          w={"65%"}
        >
          Add To Cart
        </Button>
      </HStack>
    </VStack>
  );
};

export default ProductPage;
