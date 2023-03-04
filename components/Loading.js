import { Image } from "native-base";

const Loading = () => {
  return (
    <Image
      resizeMode={"contain"}
      source={require("../assets/loading.gif")}
      alt=""
    />
  );
};

export default Loading;
