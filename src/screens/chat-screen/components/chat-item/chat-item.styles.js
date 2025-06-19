import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export default StyleSheet.create({
  item: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.light.icon,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  channel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: COLORS.light.text,
  },
  text: {
    fontSize: 15,
    color: COLORS.light.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    color: COLORS.light.icon,
  },
  status: {
    fontSize: 12,
    color: COLORS.light.icon,
  },
});
