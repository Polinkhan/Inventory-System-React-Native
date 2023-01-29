import { Button, Divider, HStack, Icon, Text, VStack, Wrap } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Product from "../Product/Product";
import { client } from "../../axios/Client";

const CategoryProducts = ({ navigation, route }) => {
  const { id, name } = route.params;
  const { primaryColor, primaryBackgroundColor } = theme;
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    client
      .get(`db/category/${id}`)
      .then((res) => {
        const { data } = res.data;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} px={4}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HStack alignItems={"center"} justifyContent={"space-between"} py={2}>
          <Button
            variant={"ghost"}
            _pressed={{ backgroundColor: "white" }}
            colorScheme={"gray"}
            _text={{ fontFamily: "exo", fontSize: "xl" }}
            leftIcon={<Icon as={AntDesign} name={"arrowleft"} />}
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
          <Text
            px={4}
            fontSize={"2xl"}
            fontFamily={"boldExo"}
            color={primaryColor}
          >
            {name}
          </Text>
        </HStack>
        <Divider />
        <Wrap direction="row">
          {products.map((product, i) => (
            <Product key={i} props={product} />
          ))}
        </Wrap>
      </ScrollView>
    </VStack>
  );
};

export default CategoryProducts;
