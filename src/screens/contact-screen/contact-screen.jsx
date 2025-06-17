import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { contactsService } from "../../api/services/contacts";
import styles from "./contact-screen.styles";

export const ContactScreen = ({ id }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const getContactData = async () => {
    try {
      const data = await contactsService.getContact(id);

      if (!data || !data?.contact?.uuid?.length) {
        throw new Error("Contact not found");
      }

      setUser(data.contact);
    } catch {
      Alert.alert("Error", "Failed to fetch contact data");
      router.back();
    }
  };

  useEffect(() => {
    getContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user?.avatarUrl);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.uuid}>{user?.uuid}</Text>
          </View>
          <Text style={styles.info}>Phone: {user?.phoneNumber || "-"}</Text>
          <Text style={styles.info}>Created at: {user?.createdAt || "-"}</Text>
          <Text style={styles.info}>Source: {user?.source || "-"}</Text>
          <Text style={styles.info}>Tags: {user?.tags?.join(", ") || "-"}</Text>
          <Text style={styles.info}>Team: {user?.team?.name || "-"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
