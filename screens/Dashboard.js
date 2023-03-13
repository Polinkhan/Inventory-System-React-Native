import { Divider, Wrap } from "native-base";
import { VStack, HStack, Text, BoldText } from "../components/Elements";
import { ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Product from "../components/Product";
import { getAllDocumentsData } from "../DB/Firebase_funtions";
import Loading from "../components/Loading";

const Dashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const Data = await getAllDocumentsData();
      setData(Data);
    })();
  }, []);

  return (
    <VStack h={"100%"} p={4}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack
          alignItems={"center"}
          justifyContent={"space-between"}
          space={2}
          pb={3}
        >
          <HStack alignItems={"center"} alignSelf={"flex-end"}>
            <BoldText fontSize={"2xl"}>{"HEY, "}</BoldText>
            <BoldText fontSize={"2xl"}>POLIN</BoldText>
          </HStack>
          <Text
            alignSelf={"flex-start"}
            px={2}
            fontFamily={"lightExo"}
            fontSize={"xl"}
            color={"gray.400"}
          >
            {/* Most Searched Item */}
            {"সর্বাধিক অনুসন্ধানকৃত প্রোডাক্ট"}
          </Text>
          <Divider />
        </VStack>
        {data ? (
          <Wrap direction="row">
            {data.map((details, i) => (
              <Product key={i} details={details} />
            ))}
          </Wrap>
        ) : (
          <Loading />
        )}
      </ScrollView>
    </VStack>
  );
};

export default Dashboard;
