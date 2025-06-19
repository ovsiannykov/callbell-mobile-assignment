import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
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
