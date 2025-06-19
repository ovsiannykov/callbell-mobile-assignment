import { memo } from "react";
import { Text, View } from "react-native";

import styles from "./chat-item.styles";

const ChatItemComponent = ({ channel, createdAt, status, text }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.channel}>{channel}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{createdAt}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
};

export const ChatItem = memo(ChatItemComponent);
