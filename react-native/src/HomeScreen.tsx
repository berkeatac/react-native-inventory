import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { RefreshControl, StyleSheet, View, FlatList } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./App";
import ProductItem from "./components/ProductItem";

export default (props: StackScreenProps<StackParamList, "Home">) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Inventory" />
      </Appbar.Header>

      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <FlatList
          data={inventory}
          renderItem={(record) => <ProductItem record={record} />}
          keyExtractor={(record) => record.id}
          refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={() => dispatch(actions.fetchInventory())}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={{ flex: 1, height: 12, width: "100%" }} />
          )}
          style={styles.list}
        />
      </View>

      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => (
            <MaterialCommunityIcons name="barcode" size={24} color="#0B5549" />
          )}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  },
  list: {
    marginTop: 16
  }
});
