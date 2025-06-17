import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export default StyleSheet.create({
  item: {
    width: "100%",
    borderWidth: 0.2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    paddingVertical: 16,
  },
  contactName: {
    fontSize: 21,
    fontWeight: "bold",
    color: COLORS.light.text,
  },
});
