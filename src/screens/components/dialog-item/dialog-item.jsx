import { Text, TouchableOpacity } from "react-native";

import styles from "./dialog-item.styles";

export const DialogItem = ({ item, onClick }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onClick(item.uuid)}>
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );
};
