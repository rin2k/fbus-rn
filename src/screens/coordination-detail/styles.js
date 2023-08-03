import { colors } from "@/styles";
import { StyleSheet } from "react-native";

const AVATAR_WIDTH = 90;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 12,
  },
  avatar: {
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    alignSelf: "center",
    borderWidth: 1,
    marginTop: 30,
  },
  headerSection: {
    backgroundColor: '#3295FF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: 'black'
  },
});
