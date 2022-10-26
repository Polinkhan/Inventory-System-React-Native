import { Center, Text } from "native-base";
import React from "react";
import MarqueeText from "react-native-marquee";
const Cart = () => {
  return (
    <Center h={"100%"} w={"90%"} mx={"auto"}>
      <MarqueeText style={{ fontSize: 40, color: "tomato" }} speed={0.1} delay={1000}>
        This Component is under development !!
      </MarqueeText>
    </Center>
  );
};

export default Cart;
