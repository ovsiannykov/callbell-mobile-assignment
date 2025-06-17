/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { useDialogsStore } from "../../store/dialogs-store";
import { DialogItem } from "../components/dialog-item/dialog-item";
import styles from "./dialogs-screen.styles";

const DialogsScreen = () => {
  const { dialogs, loading, fetchDialogs, hasMore, error } = useDialogsStore();
  const navigation = useNavigation();

  useEffect(() => {
    fetchDialogs(false);
  }, []);

  useEffect(() => {
    if (typeof error === "string" && error.length > 0) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleSelect = useCallback((contactUUID) => {
    navigation.navigate("Chat", { contactUUID });
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

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.emptyText}>There is nothing here yet</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={dialogs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshing={loading}
        onRefresh={handleRefresh}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default DialogsScreen;
