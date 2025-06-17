import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  list: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.light.icon,
    textAlign: "center",
    marginTop: "50%",
  },
});
