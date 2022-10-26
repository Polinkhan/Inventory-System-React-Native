import { Button, Center, Text } from "native-base";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <Center>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate("Profile")}>Go</Button>
    </Center>
  );
};
export default Home;
