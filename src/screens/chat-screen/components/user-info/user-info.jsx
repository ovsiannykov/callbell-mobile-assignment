import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import styles from "./user-info.styles";

export const UserInfo = ({ user }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/contact", params: { contactUUID: user.uuid } });
  };

  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
};
