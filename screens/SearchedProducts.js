import { Divider, Fab, Wrap } from "native-base";
import { Keyboard, ScrollView } from "react-native";
import React, { useState } from "react";
import { Input, VStack } from "../components/Elements";
import {
  BarCodeIcon,
  ResetIcon,
  SearchIcon,
  TrashIcon,
} from "../components/Icons";
import { useDataContext } from "../contexts/DataContext";
import ProductInList from "../components/ProductInList";
import Product from "../components/Product";
import { getDocumentData } from "../DB/Firebase_funtions";
import { debounce } from "lodash";

const Search = ({ navigation }) => {
  const [result, setResult] = useState([]);
  const hasResultData = result.length > 0 ? true : false;
  const { barCode, setBarCode } = useDataContext();

  const handleChange = debounce(async (text) => {
    console.log("call");
    const res = await getDocumentData(text).catch((err) => {
      console.log(err);
    });
    res ? setResult([{ ...res }]) : setResult([]);
    res && Keyboard.dismiss();
  }, 500);

  return (
    <VStack h={"100%"} p={4}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={4}>
          <Input
            placeholder={"Search"}
            leftElement={<SearchIcon color={"gray.400"} ml={3} size={"xl"} />}
            onChangeText={handleChange}
          />
          <Divider />
        </VStack>
        {hasResultData ? (
          <Wrap direction="row" py={2}>
            {result.map((res, i) => (
              <Product key={i} props={res} index={i} setResult={setResult} />
            ))}
          </Wrap>
        ) : (
          <Wrap direction="row" py={2}>
            {barCode.searchedItem.map((res, i) => (
              <ProductInList key={i} props={res} index={i} />
            ))}
          </Wrap>
        )}
      </ScrollView>
      {!hasResultData && (
        <Fab
          renderInPortal={false}
          shadow={2}
          size="lg"
          label={"স্কেন করুন"}
          icon={<BarCodeIcon />}
          colorScheme={"danger"}
          onPress={() =>
            navigation.navigate("other", {
              screen: "barCodeScan",
              params: { state: "forSearchItem", header: "বারকোড স্কেন করুন" },
            })
          }
        />
      )}

      {barCode.searchedItem.length > 0 && !hasResultData && (
        <Fab
          renderInPortal={false}
          _text={{ fontFamily: "exo" }}
          placement={"bottom-left"}
          icon={<TrashIcon />}
          // label={"Clear All"}
          label={"সব মুছুন"}
          shadow={2}
          size="lg"
          colorScheme={"red"}
          onPress={() => setBarCode((prev) => ({ ...prev, searchedItem: [] }))}
        />
      )}
    </VStack>
  );
};

export default Search;
