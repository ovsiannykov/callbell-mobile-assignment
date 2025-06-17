import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingHorizontal: 16,
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.light.text,
    marginVertical: 20,
  },
  uuid: {
    fontSize: 10,
    color: COLORS.light.icon,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: COLORS.light.textSecondary,
    marginBottom: 14,
    fontWeight: "300",
  },
});
