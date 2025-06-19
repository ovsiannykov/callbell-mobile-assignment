import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, View } from "react-native";

import { EmptyContent } from "../../components/empty-content/empty-content";
import { useChatStore } from "../../store/chat-store/chat-store";
import styles from "./chat-screen.styles";
import { ChatItem } from "./components/chat-item/chat-item";
import { UserInfo } from "./components/user-info/user-info";

export const ChatScreen = ({ id }) => {
  const router = useRouter();

  const { user, messages, loading, error, fetchChatData, clearError, reset } =
    useChatStore();

  useEffect(() => {
    fetchChatData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", "Failed to fetch chat data");
      clearError();
      router.back();
    }
  }, [error, clearError, router]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const keyExtractor = (item, index) =>
    item.uuid || `${item.created_at}-${item.from}-${item.status}-${index}`;

  const renderItem = ({ item }) => (
    <ChatItem
      channel={user?.name || "Unknown"}
      createdAt={item.created_at}
      status={item.status}
      text={item.text}
    />
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
        onRefresh={() => fetchChatData(id)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyContent />}
        ListHeaderComponent={<UserInfo user={user} />}
        style={styles.list}
      />
    </View>
  );
};
