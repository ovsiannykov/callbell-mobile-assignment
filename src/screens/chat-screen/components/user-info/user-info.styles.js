import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export default StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.light.text,
    textAlign: "center",
    marginBottom: 10,
  },
});
