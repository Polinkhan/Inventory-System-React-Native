import { Actionsheet, Box, Button, Center, Divider, HStack, IconButton, Input, Pressable, Select, Text, useDisclose, VStack } from "native-base";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useDataContext } from "../contexts/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import QueryModalView from "./QueryModalView";
import ProductModalView from "./ProductModalView";
import { Entypo } from "@expo/vector-icons";

const Products = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);

  const { HeaderName, isRoot, path } = route.params;
  const { database } = useDataContext();

  const pathArray = path.split(" ");
  const ProductLists = pathArray.reduce((prev, curr) => {
    return prev[curr];
  }, database);

  return (
    <Center minH={"100%"} bg={"#f5f5f5"}>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <Box bg={"#f5f5f5"} py={2} px={4}>
          <VStack w={"100%"} p={4} my={2} h={200} bg={"blueGray.300"} justifyContent={"space-between"} borderRadius={"2xl"}>
            <Center>
              <Text></Text>
            </Center>
            <Center>
              <Text fontSize={"5xl"} fontWeight={"bold"} color={"gray.700"}>
                {HeaderName}
              </Text>
            </Center>
            <HStack justifyContent={"space-between"} w={"100%"}>
              {!isRoot && (
                <Button
                  variant={"ghost"}
                  borderRadius={"xl"}
                  _text={{
                    color: "gray.700",
                    fontSize: "lg",
                  }}
                  leftIcon={<Ionicons name="arrow-back" size={16} color="black" />}
                  onPress={() => !isRoot && navigation.goBack()}
                >
                  Back
                </Button>
              )}
              <Button
                ml={"auto"}
                variant={"ghost"}
                borderRadius={"xl"}
                _text={{
                  color: "gray.700",
                  fontSize: "lg",
                }}
                rightIcon={<Ionicons name="add-circle" size={24} color="#3f3f46" />}
                onPress={() => setShowModal(true)}
              >
                Add
              </Button>
            </HStack>
          </VStack>
          <Divider />
        </Box>
        <Center w={"100%"} flexDirection="row" flexWrap={"wrap"} justifyContent={"space-between"} px={4} zIndex={0}>
          {Array.isArray(ProductLists) ? (
            <VStack w={"100%"} space={4}>
              {ProductLists.map((list, i) => (
                <ProductDetails key={i} index={i} list={list} path={path} />
              ))}
              <ProductModalView path={pathArray} currData={ProductLists} showModal={showModal} setShowModal={setShowModal} HeaderName={HeaderName} />
            </VStack>
          ) : (
            <>
              {Object.keys(ProductLists).map((list, i) => (
                <Product key={i} navigation={navigation} data={ProductLists} item={list} path={path} />
              ))}
              <QueryModalView path={pathArray} currData={ProductLists} showModal={showModal} setShowModal={setShowModal} HeaderName={HeaderName} />
            </>
          )}
        </Center>
      </ScrollView>
    </Center>
  );
};

const ProductDetails = ({ index, list, path }) => {
  const VDividerProps = {
    bg: "gray.400",
    mx: "2",
    orientation: "vertical",
  };
  const HDividerProps = {
    bg: "gray.400",
    my: "2",
    orientation: "horizontal",
  };

  const { onOpen, isOpen, onClose } = useDisclose();

  return (
    <>
      <Pressable onLongPress={onOpen}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <HStack w={"100%"} bg={isPressed ? "coolGray.200" : "white"} borderRadius={"2xl"} alignItems={"center"} justifyContent={"space-between"} p={4} shadow={2}>
              <Center minW={"20%"} maxW={"30%"}>
                <Text fontSize={"xl"}>{list.name}</Text>
              </Center>
              <Divider {...VDividerProps} />
              <VStack>
                <Text>Buy Price : {list.buyPrice}</Text>
                <Divider {...HDividerProps} />
                <Text fontSize={"xl"}>Sell Price : {list.sellPrice}</Text>
              </VStack>
              <Divider {...VDividerProps} />
              <Center minW={"20%"}>
                <Text fontSize={"xl"} color={"gray.600"}>
                  {list.unit}
                </Text>
              </Center>
            </HStack>
          );
        }}
      </Pressable>
      <OnHold isOpen={isOpen} onClose={onClose} item={list} path={path.split(" ")} index={index} />
    </>
  );
};

const Product = ({ navigation, data, item, path }) => {
  const { onOpen, isOpen, onClose } = useDisclose();
  return (
    <Center w={"30%"} h={120} my={2}>
      <Pressable
        w={"100%"}
        h={"100%"}
        onPress={() =>
          navigation.push("Product-item", {
            HeaderName: item,
            isRoot: false,
            path: path + " " + item,
          })
        }
        onLongPress={onOpen}
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Center bg={isPressed ? "coolGray.200" : "white"} borderRadius={"2xl"} h={"100%"} w={"100%"} shadow={"1"}>
              <Text fontSize={"lg"}>{item}</Text>
            </Center>
          );
        }}
      </Pressable>
      <OnHold isOpen={isOpen} onClose={onClose} item={item} path={path.split(" ")} />
    </Center>
  );
};

function OnHold({ isOpen, onClose, item, path, index }) {
  const { database, updateDatabase } = useDataContext();
  const [editName, setEditName] = useState(item);
  const [editproduct, setEditProduct] = useState({
    name: item.name,
    buyPrice: item.buyPrice,
    sellPrice: item.sellPrice,
    unit: item.unit,
  });

  const deleteInRecursion = (copyPath, copyData, item) => {
    if (copyPath.length === 0) {
      if (index !== undefined) {
        copyData.splice(index, 1);
      } else delete copyData[item];
    }
    if (copyPath.length) deleteInRecursion(copyPath, copyData[copyPath.shift()], item);
  };

  const handleDeleteChange = () => {
    const copyData = { ...database };
    const copyPath = [...path];
    deleteInRecursion(copyPath, copyData, item);
    updateDatabase(copyData);
    onClose();
  };

  const editInRecursion = (copyPath, copyData, item) => {
    if (copyPath.length === 0) {
      if (index !== undefined) {
        copyData[index] = editproduct;
      } else {
        copyData[editName.replace(/\s+/g, "_")] = copyData[item];
        delete copyData[item];
      }
    }
    if (copyPath.length) editInRecursion(copyPath, copyData[copyPath.shift()], item);
  };

  const handleEditChange = () => {
    const copyData = { ...database };
    const copyPath = [...path];
    editInRecursion(copyPath, copyData, item);
    updateDatabase(copyData);
    onClose();
  };

  const UnitList = ["Per/Pcs", "Per/Feet", "Per/Meter", "Per/Goj", "Per/KG", "Per/Gram", "Per/Leter"];

  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} justifyContent="center" px={4}>
            <Text fontSize="24" color="gray.500">
              {index === undefined ? "<" + item + "/>" : "<" + item.name + "/>"}
            </Text>
          </Box>
          <VStack p={4} space={4}>
            {index === undefined ? (
              <HStack w={"100%"} space={2}>
                <Input w={"84%"} variant={"rounded"} autoFocus value={editName} onChangeText={(text) => setEditName(text)} />
                <IconButton w={"14%"} rounded={"full"} variant={"outline"} icon={<Ionicons name="checkmark-sharp" size={20} color="black" />} isDisabled={item === editName ? true : false} onPress={handleEditChange} />
              </HStack>
            ) : (
              <HStack w={"100%"} space={2}>
                <VStack w={"80%"} space={2}>
                  <Input w={"100%"} variant={"rounded"} autoFocus value={editproduct.name} onChangeText={(text) => setEditProduct({ ...editproduct, name: text })} />
                  <HStack space={2}>
                    <Input w={"49%"} variant={"rounded"} value={editproduct.buyPrice} keyboardType="numeric" onChangeText={(text) => setEditProduct({ ...editproduct, buyPrice: text })} />
                    <Input w={"49%"} variant={"rounded"} value={editproduct.sellPrice} keyboardType="numeric" onChangeText={(text) => setEditProduct({ ...editproduct, sellPrice: text })} />
                  </HStack>
                  <Select
                    fontSize={"sm"}
                    borderRadius={"full"}
                    selectedValue={editproduct.unit}
                    placeholder="Unit?"
                    onValueChange={(itemValue) => setEditProduct({ ...editproduct, unit: itemValue })}
                    _selectedItem={{
                      borderRadius: "full",
                      endIcon: <Entypo name="check" size={24} color="black" />,
                    }}
                  >
                    {UnitList.map((unit, i) => (
                      <Select.Item key={i} label={unit} value={unit} borderRadius={"full"} />
                    ))}
                  </Select>
                </VStack>
                <IconButton w={"20%"} rounded={"2xl"} variant={"outline"} icon={<Ionicons name="checkmark-sharp" size={30} color="black" />} isDisabled={item.name === editproduct.name ? true : false} onPress={handleEditChange} />
              </HStack>
            )}

            <HStack space={2}>
              <Actionsheet.Item w={"49%"} onPress={handleDeleteChange} p={3} rounded={"full"} bg={"red.500"} borderWidth={1} borderColor={"red.600"} _text={{ color: "white" }}>
                Delete
              </Actionsheet.Item>
              <Actionsheet.Item w={"49%"} onPress={onClose} p={3} borderWidth={1} borderColor={"gray.300"} rounded={"full"} alignSelf={"center"}>
                <Text textAlign={"center"} w={"100%"}>
                  Cancel
                </Text>
              </Actionsheet.Item>
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default Products;
