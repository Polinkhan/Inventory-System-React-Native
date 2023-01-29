import {
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  Wrap,
} from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";

import { Feather, AntDesign } from "@expo/vector-icons";

import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import Product from "../Product/Product";

const { primaryBackgroundColor } = theme;

const Dashboard = ({ navigation }) => {
  const { primaryColor } = theme;
  const {} = useDataContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack
          alignItems={"center"}
          justifyContent={"space-between"}
          space={2}
        >
          <HStack space={2} alignSelf={"flex-start"} alignItems={"center"}>
            <Icon as={Feather} name={"slack"} size={"lg"} color={"black"} />
            <Text fontFamily={"boldExo"} fontSize={"4xl"}>
              KHAN ENTERPRISE
            </Text>
          </HStack>
          <HStack alignItems={"center"} alignSelf={"flex-end"}>
            <Text fontFamily={"boldExo"} fontSize={"2xl"}>
              {"HEY, "}
            </Text>
            <Text color={primaryColor} fontFamily={"boldExo"} fontSize={"2xl"}>
              POLIN
            </Text>
            <IconButton
              colorScheme={"gray"}
              onPress={() => navigation.navigate("search")}
              icon={
                <Icon
                  as={Feather}
                  name={"search"}
                  size={"xl"}
                  color={"black"}
                />
              }
            />
          </HStack>
          <Text
            alignSelf={"flex-start"}
            px={2}
            fontFamily={"lightExo"}
            fontSize={"xl"}
            color={"gray.400"}
          >
            Most Searched Item
          </Text>
          <Divider />
        </VStack>
        <Wrap direction="row" py={2}>
          <Product />
          <Product />
          <Product />
        </Wrap>
      </ScrollView>
    </VStack>
  );
};

export default Dashboard;
