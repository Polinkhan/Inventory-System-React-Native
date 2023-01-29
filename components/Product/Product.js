import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import React from "react";

const Product = ({ props = {} }) => {
  return (
    <Box w={"50%"} p={2}>
      <VStack
        p={4}
        space={4}
        borderWidth={1}
        borderColor={"gray.300"}
        borderRadius={16}
      >
        <Image
          alt="Product"
          w={"100%"}
          h={24}
          resizeMode={"contain"}
          source={require("../../assets/product.png")}
        />
        <VStack>
          <Text fontFamily={"exo"} fontSize={"md"} noOfLines={1}>
            {props.name}
          </Text>
          <Text fontFamily={"lightExo"} noOfLines={1}>
            {`Brand : ${props.brand}`}
          </Text>
          <HStack alignItems={"flex-end"}>
            <Text fontFamily={"boldExo"} fontSize={"xl"} noOfLines={1}>
              {`৳${props.sellPrice}`}
            </Text>
            <Text fontFamily={"lightExo"} noOfLines={1}>
              {`/${props.unit}`}
            </Text>
          </HStack>
        </VStack>
        <Button
          colorScheme={"red"}
          borderRadius={8}
          _text={{ fontFamily: "exo", fontSize: "lg" }}
        >
          Add to cart
        </Button>
      </VStack>
    </Box>
  );
};

export default Product;
