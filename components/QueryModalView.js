import { Button, Center, Text, VStack, Modal, Input, Select } from "native-base";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDataContext } from "../contexts/DataContext";
const QueryModalView = ({ path, showModal, setShowModal, HeaderName }) => {
  const { database, updateDatabase } = useDataContext();

  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");

  const changeInRecursion = (copyPath, copyData) => {
    if (copyPath.length === 0) {
      if (selected === "query") copyData[name.replace(/\s+/g, "_")] = {};
      else copyData[name.replace(/\s+/g, "_")] = [];
    }
    if (copyPath.length) changeInRecursion(copyPath, copyData[copyPath.shift()]);
  };

  const handleChange = () => {
    const copyPath = [...path];
    const copyData = { ...database };
    changeInRecursion(copyPath, copyData);
    updateDatabase({ ...copyData });
    setName("");
  };

  return (
    <Center>
      <Modal
        size={"lg"}
        isOpen={showModal}
        animationPreset={"fade"}
        onClose={() => {
          setShowModal(false);
          setSelected("");
        }}
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
              <Input variant={"rounded"} placeholder={`Enter ${HeaderName} Name Here`} fontSize={"sm"} value={name} onChangeText={(text) => setName(text)} />
              <Select
                fontSize={"sm"}
                borderRadius={"full"}
                selectedValue={selected}
                accessibilityLabel="Choose Service"
                placeholder="Component For?"
                onValueChange={(itemValue) => setSelected(itemValue)}
                _selectedItem={{
                  borderRadius: "full",
                  endIcon: <Entypo name="check" size={24} color="black" />,
                }}
                variant={"rounded"}
              >
                <Select.Item label="To Add Query" value="query" borderRadius={"full"} />
                <Select.Item my={3} label="To Add Product" value="product" borderRadius={"full"} />
              </Select>
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
                  setSelected("");
                }}
              >
                Cancel
              </Button>
              <Button
                size={"lg"}
                rounded={"full"}
                onPress={() => {
                  handleChange();
                  setShowModal(false);
                  setSelected("");
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

export default QueryModalView;
