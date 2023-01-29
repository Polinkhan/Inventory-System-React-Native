import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { client } from "../../axios/Client";

const AddItems = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const { primaryColor, primaryOpacityColor } = theme;

  const tabs = [
    {
      route: "addproduct",
      label: "Add Products",
      iconProvider: MaterialIcons,
      iconName: "dashboard",
      component: AddProducts,
    },
    {
      route: "addcategory",
      label: "Add Category",
      iconProvider: MaterialIcons,
      iconName: "category",
      component: AddCategory,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          shadowColor: "white",
        },
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: {
          backgroundColor: primaryColor,
        },
      }}
    >
      {tabs.map((_, i) => (
        <Tab.Screen
          key={i}
          name={_.route}
          component={_.component}
          options={{
            tabBarLabel: _.label,
            tabBarColor: _.barColor,
            tabBarLabelStyle: {
              fontFamily: "exo",
              fontSize: 16,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const AddProducts = () => {
  const { primaryBackgroundColor } = theme;
  const { makeToast } = useDataContext();

  const staticParam = {
    py: 3,
    borderRadius: 12,
    variant: "filled",
    fontSize: "lg",
    fontFamily: "exo",
    _focus: {
      backgroundColor: "gray.100",
      borderColor: "gray.200",
    },
  };

  const init_product = {
    buyPrice: -1,
    categoryId: "",
    name: "",
    sellPrice: -1,
    unit: "",
    brand: "",
  };

  const [btnLoad, setBtnLoad] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState(init_product);

  useEffect(() => {
    client
      .get("db/category")
      .then((res) => {
        const { data } = res.data;
        setCategoryList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    if (
      product.name === "" ||
      product.sellPrice === -1 ||
      product.categoryId === ""
    )
      makeToast("Error !! Product Name/Price/Category cannot be empty");
    else {
      Keyboard.dismiss();
      setBtnLoad(true);
      client
        .post("db/addItem/product", product)
        .then(() => {
          setProduct(init_product);
          makeToast("Product Added Successfully");
        })
        .catch((err) => makeToast(err.massage))
        .finally(() => setBtnLoad(false));
    }
    console.log(product);
  };

  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
      <Text fontFamily={"boldExo"} fontSize={"2xl"} color={"gray.700"}>
        Add New Product
      </Text>
      <VStack
        flex={1}
        space={4}
        justifyContent={"center"}
        alignSelf={"center"}
        w={"90%"}
      >
        <Input
          {...staticParam}
          placeholder={"Name"}
          value={product.name}
          onChangeText={(text) =>
            setProduct((prev) => ({ ...prev, name: text }))
          }
        />
        <Input
          {...staticParam}
          placeholder={"Brand"}
          value={product.brand}
          onChangeText={(text) =>
            setProduct((prev) => ({ ...prev, brand: text }))
          }
        />
        <HStack space={4}>
          <Input
            w={"48%"}
            {...staticParam}
            placeholder={"Sell Price"}
            keyboardType={"numeric"}
            value={product.sellPrice}
            onChangeText={(text) =>
              setProduct((prev) => ({ ...prev, sellPrice: text }))
            }
          />
          <Input
            w={"48%"}
            {...staticParam}
            placeholder={"Buy Price"}
            keyboardType={"numeric"}
            value={product.buyPrice}
            onChangeText={(text) =>
              setProduct((prev) => ({ ...prev, buyPrice: text }))
            }
          />
        </HStack>
        <HStack space={4}>
          <Box w={"48%"}>
            <Select
              placeholder={`Unit`}
              {...staticParam}
              _selectedItem={{
                bg: "gray.300",
                borderRadius: 12,
              }}
              selectedValue={product.unit}
              onValueChange={(itemValue) =>
                setProduct((prev) => ({ ...prev, unit: itemValue }))
              }
            >
              {["pcs", "feet"].map((elem, i) => (
                <Select.Item
                  _pressed={{ bg: "gray.200", borderRadius: 12 }}
                  key={i}
                  label={elem}
                  value={elem}
                />
              ))}
            </Select>
          </Box>
          <Box w={"48%"}>
            <Select
              placeholder={`Category`}
              {...staticParam}
              _selectedItem={{
                bg: "gray.300",
                borderRadius: 12,
              }}
              selectedValue={product.categoryId}
              onValueChange={(itemValue) =>
                setProduct((prev) => ({ ...prev, categoryId: itemValue }))
              }
            >
              {categoryList.map((list, i) => (
                <Select.Item
                  _pressed={{ bg: "gray.200", borderRadius: 12 }}
                  key={i}
                  label={list.name}
                  value={list.id}
                />
              ))}
            </Select>
          </Box>
        </HStack>
        <Button
          _text={{ fontFamily: "exo", fontSize: "xl" }}
          borderRadius={12}
          py={3}
          colorScheme={"red"}
          onPress={handleSubmit}
          isLoading={btnLoad}
          isLoadingText={"Adding new product ..."}
        >
          Submit
        </Button>
      </VStack>
    </VStack>
  );
};
const AddCategory = () => {
  const { primaryBackgroundColor } = theme;
  const { makeToast } = useDataContext();

  const staticParam = {
    py: 3,
    borderRadius: 12,
    variant: "filled",
    fontSize: "lg",
    fontFamily: "exo",
    _focus: {
      backgroundColor: "gray.100",
      borderColor: "gray.200",
    },
  };

  const init_category = {
    id: "",
    name: "",
  };

  const [btnLoad, setBtnLoad] = useState(false);
  const [category, setCategory] = useState(init_category);

  const UpdateCategoryId = () => {
    client.get("db/category").then((res) => {
      const { data } = res.data;
      let _id = data[data.length - 1].id;
      _id = `C${parseInt(_id.substring(1, _id.length)) + 1}`;
      setCategory((prev) => ({ ...prev, id: _id }));
    });
  };

  useEffect(() => {
    UpdateCategoryId();
  }, []);

  const handleSubmit = () => {
    if (category.name === "")
      makeToast("Error !! Category Name cannot be empty");
    else {
      Keyboard.dismiss();
      setBtnLoad(true);
      client
        .post("db/addItem/category", category)
        .then(() => {
          setCategory(init_category);
          UpdateCategoryId();
          makeToast("Category Added Successfully");
        })
        .catch((err) => makeToast(err.massage))
        .finally(() => setBtnLoad(false));
    }
  };

  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
      <Text fontFamily={"boldExo"} fontSize={"2xl"} color={"gray.700"}>
        Add New Category
      </Text>
      <VStack
        flex={1}
        space={4}
        justifyContent={"center"}
        alignSelf={"center"}
        w={"90%"}
      >
        <Input
          {...staticParam}
          placeholder={"Name"}
          value={category.name}
          onChangeText={(text) =>
            setCategory((prev) => ({ ...prev, name: text }))
          }
        />
        <Input
          {...staticParam}
          // placeholder={"ID"}
          value={category.id}
          isDisabled
          borderColor={"gray.300"}
        />
        <Button
          _text={{ fontFamily: "exo", fontSize: "xl" }}
          borderRadius={12}
          py={3}
          colorScheme={"red"}
          onPress={handleSubmit}
          isLoading={btnLoad}
          isLoadingText={"Adding new product ..."}
        >
          Submit
        </Button>
      </VStack>
    </VStack>
  );
};

export default AddItems;
