import { Avatar, Divider, HStack, Icon, Text, VStack } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { client } from "../../axios/Client";

const { primaryBackgroundColor } = theme;

const Cart = ({ navigation }) => {
  const {} = useDataContext();
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { primaryColor } = theme;

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
            My Cart
          </Text>
          <Divider />
        </VStack>

        <VStack py={4} space={4}>
          <Text>sdfsd</Text>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Cart;
