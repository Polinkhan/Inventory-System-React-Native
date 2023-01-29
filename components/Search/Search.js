import { Divider, Icon, Input, Text, VStack, Wrap } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { client } from "../../axios/Client";
import Product from "../Product/Product";

const { primaryBackgroundColor } = theme;

const Search = ({ navigation }) => {
  const [result, setResult] = useState([]);

  const handleChange = (value) => {
    if (value === "") {
      setResult([]);
    } else {
      value = value.split(" ");
      client.post("db/product/search", value).then((res) => {
        const { data } = res.data;
        setResult(data);
      });
    }
  };

  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={4} bg={"white"}>
          <Text fontFamily={"boldExo"} fontSize={"2xl"}>
            Search Product
          </Text>
          <Divider />
          <Input
            variant={"filled"}
            fontSize={"lg"}
            placeholder={"Search"}
            py={4}
            borderRadius={12}
            leftElement={
              <Icon as={Ionicons} ml={4} name="search-outline" size={"xl"} />
            }
            _focus={{
              backgroundColor: "gray.100",
              borderColor: "gray.100",
            }}
            onChangeText={handleChange}
          />
          <Divider />
        </VStack>
        <Wrap direction="row" py={2}>
          {result.map((res, i) => (
            <Product key={i} props={res} />
          ))}
        </Wrap>
      </ScrollView>
    </VStack>
  );
};

export default Search;
