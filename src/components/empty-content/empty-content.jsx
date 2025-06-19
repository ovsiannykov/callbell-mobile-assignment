import { Text, View } from "react-native";
import styles from "./empty-content.styles";

export const EmptyContent = () => (
  <View style={styles.emptyScreen}>
    <Text style={styles.emptyText}>There is nothing here yet</Text>
  </View>
);
