import { fontSizes, fonts } from "@/styles";
import { StyleSheet } from "react-native";

const LOGO_WIDTH = 150;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 70,
  },
  logo: {
    resizeMode: "center",
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
    alignSelf: "center",
  },
  welcome: {
    textAlign: "center",
    fontSize: fontSizes.h2,
    fontFamily: fonts.medium,
    marginTop: 30,
    marginBottom: 100,
    color: 'black',
    fontWeight: "bold",
    fontSize: 50
  },
});
