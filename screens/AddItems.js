import { Box, Button, IconButton, Select } from "native-base";
import { useDataContext } from "../contexts/DataContext";
import { theme } from "../utils/StaticVariable";
import { MaterialIcons } from "@expo/vector-icons";
import { Keyboard, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, VStack, Input, HStack } from "../components/Elements";
import { Colors } from "../constants/Colors";
import { BarCodeIcon, ResetIcon } from "../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { addProductData } from "../DB/Firebase_funtions";

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

export const AddProducts = () => {
  const { makeToast, barCode, setBarCode, autoId } = useDataContext();

  const { colorScheme } = useDataContext();
  const navigation = useNavigation();

  const init_product = {
    buyPrice: "",
    categoryId: "",
    name: "",
    sellPrice: "",
    unit: "",
    brand: "",
  };

  const [btnLoad, setBtnLoad] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState(init_product);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setBtnLoad(true);

    const isBarCodeScanned = barCode.addItem ? true : false;

    const ID = isBarCodeScanned ? barCode.addItem : autoId;

    addProductData(ID, product, isBarCodeScanned)
      .then((res) => {
        makeToast(res.message);
        setProduct(init_product);
        isBarCodeScanned && setBarCode((prev) => ({ ...prev, addItem: "" }));
      })
      .catch((err) => makeToast(err))
      .finally(() => setBtnLoad(false));
  };

  return (
    <VStack h={"100%"} p={4}>
      <VStack
        flex={1}
        space={4}
        justifyContent={"center"}
        alignSelf={"center"}
        w={"90%"}
      >
        <HStack space={2}>
          <Input
            flex={1}
            isDisabled
            value={barCode.addItem ? barCode.addItem : autoId}
            rightElement={
              barCode.addItem && (
                <ResetIcon
                  color={"white"}
                  mr={4}
                  onPress={() => {
                    setBarCode((prev) => ({ ...prev, addItem: "" }));
                  }}
                />
              )
            }
          />
          <IconButton
            flex={0.15}
            py={4}
            borderRadius={8}
            icon={<BarCodeIcon color={Colors[colorScheme].text} />}
            bg={Colors[colorScheme].BoxBackground}
            onPress={() => {
              navigation.navigate("other", {
                screen: "barCodeScan",
                params: { state: "forAddItem", header: "বারকোড স্কেন করুন" },
              });
            }}
          />
        </HStack>
        <Input
          placeholder={"প্রোডাক্ট এর নাম"}
          value={product.name}
          onChangeText={(text) =>
            setProduct((prev) => ({ ...prev, name: text }))
          }
        />
        <HStack space={4}>
          <Input
            w={"48%"}
            placeholder={"বিক্রয় মুল্য"}
            keyboardType={"numeric"}
            value={product.sellPrice}
            onChangeText={(text) =>
              setProduct((prev) => ({ ...prev, sellPrice: text }))
            }
          />
          <Input
            w={"48%"}
            placeholder={"ক্রয় মুল্য"}
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
              py={3}
              placeholder={`একক`}
              borderWidth={0}
              borderRadius={8}
              bg={Colors[colorScheme].BoxBackground}
              _selectedItem={{
                bg: "gray.300",
                borderRadius: 8,
              }}
              fontSize={"lg"}
              fontFamily={"exo"}
              selectedValue={product.unit}
              onValueChange={(itemValue) =>
                setProduct((prev) => ({ ...prev, unit: itemValue }))
              }
            >
              {[
                "পিছ",
                "কেজি",
                "গ্রাম",
                "পাউন্ড",
                "আউন্স",
                "ইঞ্চি",
                "ফুট",
                "গজ",
                "লিটার",
                "গেলন",
              ].map((elem, i) => (
                <Select.Item
                  _pressed={{ bg: "gray.200", borderRadius: 8 }}
                  key={i}
                  label={elem}
                  value={elem}
                />
              ))}
            </Select>
          </Box>
          <Box w={"48%"}>
            <Select
              py={3}
              placeholder={`কেটাগরি`}
              borderWidth={0}
              borderRadius={8}
              bg={Colors[colorScheme].BoxBackground}
              fontSize={"lg"}
              fontFamily={"exo"}
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
          isDisabled={(!product.name || !product.sellPrice) && true}
          _text={{ fontFamily: "exo", fontSize: "xl" }}
          borderRadius={12}
          py={3}
          colorScheme={"danger"}
          onPress={handleSubmit}
          isLoading={btnLoad}
          isLoadingText={"Adding new product ..."}
        >
          জমা দিন
        </Button>
      </VStack>
    </VStack>
  );
};

// export const AddCategory = () => {
//   const { primaryBackgroundColor } = theme;
//   const { makeToast } = useDataContext();

//   const staticParam = {
//     py: 3,
//     borderRadius: 12,
//     variant: "filled",
//     fontSize: "lg",
//     fontFamily: "exo",
//     _focus: {
//       backgroundColor: "gray.100",
//       borderColor: "gray.200",
//     },
//   };

//   const init_category = {
//     id: "",
//     name: "",
//   };

//   const [btnLoad, setBtnLoad] = useState(false);
//   const [category, setCategory] = useState(init_category);

//   const UpdateCategoryId = () => {
//     client.get("db/category").then((res) => {
//       const { data } = res.data;
//       let _id = data[data.length - 1].id;
//       _id = `C${parseInt(_id.substring(1, _id.length)) + 1}`;
//       setCategory((prev) => ({ ...prev, id: _id }));
//     });
//   };

//   useEffect(() => {
//     UpdateCategoryId();
//   }, []);

//   const handleSubmit = () => {
//     if (category.name === "")
//       makeToast("Error !! Category Name cannot be empty");
//     else {
//       Keyboard.dismiss();
//       setBtnLoad(true);
//       client
//         .post("db/addItem/category", category)
//         .then(() => {
//           setCategory(init_category);
//           UpdateCategoryId();
//           makeToast("Category Added Successfully");
//         })
//         .catch((err) => makeToast(err.massage))
//         .finally(() => setBtnLoad(false));
//     }
//   };

//   return (
//     <VStack h={"100%"} bg={primaryBackgroundColor} p={4}>
//       <Text fontFamily={"boldExo"} fontSize={"2xl"} color={"gray.700"}>
//         Add New Category
//       </Text>
//       <VStack
//         flex={1}
//         space={4}
//         justifyContent={"center"}
//         alignSelf={"center"}
//         w={"90%"}
//       >
//         <Input
//           {...staticParam}
//           placeholder={"Name"}
//           value={category.name}
//           onChangeText={(text) =>
//             setCategory((prev) => ({ ...prev, name: text }))
//           }
//         />
//         <Input
//           {...staticParam}
//           // placeholder={"ID"}
//           value={category.id}
//           isDisabled
//           borderColor={"gray.300"}
//         />
//         <Button
//           _text={{ fontFamily: "exo", fontSize: "xl" }}
//           borderRadius={12}
//           py={3}
//           colorScheme={"red"}
//           onPress={handleSubmit}
//           isLoading={btnLoad}
//           isLoadingText={"Adding new product ..."}
//         >
//           Submit
//         </Button>
//       </VStack>
//     </VStack>
//   );
// };

export default AddItems;
