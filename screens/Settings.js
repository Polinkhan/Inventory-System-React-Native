import React, { useState } from "react";
import { MenuButton, VStack } from "../components/Elements";
import { DarkIcon, LanguageIcon } from "../components/Icons";

const Settings = ({ navigation }) => {
  return (
    <VStack h={"100%"} p={4}>
      <VStack space={4}>
        <MenuButton
          icon={DarkIcon}
          onPress={() =>
            navigation.navigate("other", {
              screen: "darkmode",
              params: { header: "Dark Mode" },
            })
          }
        >
          Dark Mode
        </MenuButton>
        <MenuButton icon={LanguageIcon} onPress={() => {}}>
          Language
        </MenuButton>
      </VStack>
    </VStack>
  );
};

export default Settings;
