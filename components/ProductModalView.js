import { Button, Center, HStack, Text, VStack, Modal, Input, Select } from "native-base";
import React, { useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import { Entypo } from "@expo/vector-icons";
const ProductModalView = ({ path, showModal, setShowModal, HeaderName }) => {
  const { database, updateDatabase } = useDataContext();
  const [product, setProduct] = useState({
    name: "",
    buyPrice: "",
    sellPrice: "",
    unit: "",
  });

  const changeInRecursion = (copyPath, copyData) => {
    if (Array.isArray(copyData)) {
      copyData.push(product);
    }
    if (copyPath.length) changeInRecursion(copyPath, copyData[copyPath.shift()]);
  };

  const handleSubmit = () => {
    const copyData = { ...database };
    const copyPath = [...path];
    changeInRecursion(copyPath, copyData);
    updateDatabase({ ...copyData });
    setProduct({
      name: "",
      buyPrice: "",
      sellPrice: "",
      unit: "",
    });
  };

  const toEn = (n) => n.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));
  const UnitList = ["Per/Pcs", "Per/Feet", "Per/Meter", "Per/Goj", "Per/KG", "Per/Gram", "Per/Leter"];

  return (
    <Center>
      <Modal
        size={"lg"}
        isOpen={showModal}
        animationPreset={"fade"}
        onClose={() => {
          setShowModal(false);
        }}
        _fade={{}}
      >
        <Modal.Content borderRadius={"xl"} p={4}>
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.700"}>
              Add {HeaderName}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <VStack space={4}>
                <Input variant={"rounded"} placeholder={"Product Name"} fontSize={"sm"} value={product.name} onChangeText={(text) => setProduct({ ...product, name: text })} />
                <HStack justifyContent={"space-between"}>
                  <Input w={"49%"} variant={"rounded"} placeholder={`Buy Price`} fontSize={"sm"} value={product.buyPrice} keyboardType="numeric" onChangeText={(text) => setProduct({ ...product, buyPrice: toEn(text) })} />
                  <Input w={"49%"} variant={"rounded"} placeholder={`Sell Price`} fontSize={"sm"} value={product.sellPrice} keyboardType="numeric" onChangeText={(text) => setProduct({ ...product, sellPrice: toEn(text) })} />
                </HStack>
                <Select
                  fontSize={"sm"}
                  borderRadius={"full"}
                  selectedValue={product.unit}
                  placeholder="Unit?"
                  onValueChange={(itemValue) => setProduct({ ...product, unit: itemValue })}
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
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                rounded={"full"}
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size={"lg"}
                rounded={"full"}
                onPress={() => {
                  handleSubmit();
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ProductModalView;
