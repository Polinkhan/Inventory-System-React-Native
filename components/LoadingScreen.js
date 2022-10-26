import { Center, Skeleton, VStack } from "native-base";
import React from "react";

const LoadingScreen = () => {
  return (
    <Center w="100%">
      <VStack w={"100%"} p={4} my={2} h={"100%"} justifyContent={"space-between"} borderRadius={"2xl"}>
        <Skeleton h={200} />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

export default LoadingScreen;
