import { Colors } from "../constants/Colors";
import {
  Entypo,
  MaterialIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Icon } from "native-base";
import { useDataContext } from "../contexts/DataContext";

const BarCodeIcon = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <Icon
      as={MaterialCommunityIcons}
      name={"barcode-scan"}
      size={"lg"}
      {...props}
    />
  );
};

const SearchIcon = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <Icon
      as={Ionicons}
      name={"search-outline"}
      size={"md"}
      color={Colors[colorScheme].text}
      {...props}
    />
  );
};

const DashboardIcon = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <Icon
      as={MaterialIcons}
      name={"dashboard"}
      size={"md"}
      color={Colors[colorScheme].text}
      {...props}
    />
  );
};

const AddItemsIcon = (props) => {
  const { colorScheme } = useDataContext();
  return (
    <Icon
      as={Entypo}
      name={"add-to-list"}
      size={"md"}
      color={Colors[colorScheme].text}
      {...props}
    />
  );
};

const SettingsIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={AntDesign} name={"setting"} size={"md"} {...props} />;
};

const DarkIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Ionicons} name={"moon"} size={"md"} {...props} />;
};

const LightIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Ionicons} name={"sunny-outline"} size={"md"} {...props} />;
};

const ResetIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={SimpleLineIcons} name={"refresh"} size={"md"} {...props} />;
};

const EyeOnIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Ionicons} name={"eye-sharp"} size={"md"} {...props} />;
};

const EyeOffIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Ionicons} name={"eye-off-sharp"} size={"md"} {...props} />;
};

const PlusIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Entypo} name={"plus"} size={"md"} {...props} />;
};

const MinusIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Entypo} name={"minus"} size={"md"} {...props} />;
};

const TrashIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={Ionicons} name={"trash"} size={"md"} {...props} />;
};
const LanguageIcon = (props) => {
  const { colorScheme } = useDataContext();
  return <Icon as={FontAwesome} name={"language"} size={"md"} {...props} />;
};

export {
  SearchIcon,
  DashboardIcon,
  AddItemsIcon,
  BarCodeIcon,
  SettingsIcon,
  DarkIcon,
  LightIcon,
  ResetIcon,
  EyeOnIcon,
  EyeOffIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  LanguageIcon,
};
