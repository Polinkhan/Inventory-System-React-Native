import { Button, Center, HStack, Link, Text, VStack } from "native-base";
import React from "react";
import { useDataContext } from "../contexts/DataContext";

const About = () => {
  const { getCities } = useDataContext();
  return (
    <>
      <VStack bg={"gray.200"} m={8} px={4} py={12} space={4} alignItems={"center"} borderRadius={"2xl"}>
        <Text fontSize={"3xl"} textAlign={"center"} fontWeight={"bold"}>
          Khan Enterprice Inventory Management System
        </Text>
        <Text>Version : 1.0.0</Text>
        <Link _text={{ fontSize: "xl" }} href="https://github.com/Polinkhan/Inventory-System-React-Native-">
          See Source Code
        </Link>
      </VStack>
    </>
  );
};

export default About;
