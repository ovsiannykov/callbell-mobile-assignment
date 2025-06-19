/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import { EmptyContent } from "../../components/empty-content/empty-content";
import { useDialogsStore } from "../../store/dialogs-store/dialogs-store";
import { DialogItem } from "./components/dialog-item/dialog-item";
import styles from "./dialogs-screen.styles";

const DialogsScreen = () => {
  const { dialogs, loading, fetchDialogs, hasMore, error } = useDialogsStore();
  const router = useRouter();

  useEffect(() => {
    fetchDialogs(false);
  }, []);

  useEffect(() => {
    if (typeof error === "string" && error.length > 0) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleSelect = useCallback((contactUUID) => {
    router.push({ pathname: "/chat", params: { contactUUID } });
  }, []);

  const keyExtractor = useCallback((item) => item.uuid, []);

  const renderItem = useCallback(
    ({ item }) => <DialogItem item={item} onClick={handleSelect} />,
    []
  );

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchDialogs(true);
    }
  }, [fetchDialogs, loading, hasMore]);

  const handleRefresh = useCallback(() => {
    fetchDialogs(false);
  }, [fetchDialogs]);

  return (
    <View style={styles.screen}>
      <FlatList
        testID="flat-list"
        data={dialogs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshing={loading}
        onRefresh={handleRefresh}
        ListEmptyComponent={<EmptyContent />}
      />
    </View>
  );
};

export default DialogsScreen;
