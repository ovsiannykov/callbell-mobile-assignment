import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./dialog-item.styles";

const DialogItemComponent = ({ item, onClick }) => {
  const handleClick = () => {
    if (typeof onClick !== "function" || !item.uuid) return;
    onClick(item.uuid);
  };

  return (
    <TouchableOpacity
      testID={`dialog-${item.uuid}`}
      style={styles.item}
      onPress={handleClick}
    >
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export const DialogItem = memo(DialogItemComponent);
