import { Avatar, Divider, HStack, Icon, Text, VStack } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { client } from "../../axios/Client";

const { primaryBackgroundColor } = theme;

const Catagory = ({ navigation }) => {
  const {} = useDataContext();
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategoryData = () => {
    client
      .get("db/category")
      .then((res) => {
        const { data } = res.data;
        setCategory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategoryData();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, []);
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack space={4}>
          <Text fontFamily={"boldExo"} fontSize={"2xl"}>
            Choose Category
          </Text>
          <Divider />
        </VStack>

        <VStack space={4} py={4}>
          {category.map((list, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate("categoryproduct", { ...list });
              }}
            >
              <HStack
                p={2}
                alignItems={"center"}
                space={2}
                borderWidth={1}
                borderColor={"gray.300"}
                borderRadius={16}
              >
                <Avatar
                  bg={"white"}
                  source={require("../../assets/product.png")}
                />
                <Text fontFamily={"boldExo"} fontSize={"xl"}>
                  {list.name}
                </Text>
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Catagory;
