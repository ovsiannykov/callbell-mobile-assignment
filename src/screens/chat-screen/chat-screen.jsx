import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

import { contactsService } from "../../api/services/contacts";
import { messagesService } from "../../api/services/messages";
import { EmptyContent } from "../../components/empty-content/empty-content";
import styles from "./chat-screen.styles";
import { ChatItem } from "./components/chat-item/chat-item";
import { UserInfo } from "./components/user-info/user-info";

export const ChatScreen = ({ id }) => {
  const router = useRouter();
  const [messages, setMessages] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataHandler = async () => {
    setLoading(true);

    try {
      const contactData = await contactsService.getContact(id);

      if (!contactData || !contactData?.contact?.uuid?.length) {
        throw new Error("Contact not found");
      }

      const contact = contactData.contact;
      setUser(contact);

      if (!contact.uuid) {
        throw new Error("Failed to get contact data");
      }

      const messagesData = await messagesService.getMessages(contact.uuid);

      if (!messagesData) {
        throw new Error("Messages not found");
      }

      setMessages(messagesData?.messages || []);
    } catch (e) {
      console.error("Error fetching chat data:", e);
      Alert.alert("Error", "Failed to fetch chat data");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = useCallback((item, index) => {
    if (item.uuid) return item.uuid;
    return `${item.createdAt}-${item.from}-${item.status}-${index}`;
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ChatItem
        channel={user?.name || "Unknown"}
        createdAt={item.created_at}
        status={item.status}
        text={item.text}
      />
    ),
    [user]
  );

  return (
    <View style={styles.screen}>
      <FlatList
        testID="flatlist"
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={() => getDataHandler(true)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyContent />}
        ListHeaderComponent={<UserInfo user={user} />}
        style={styles.list}
      />
    </View>
  );
};
