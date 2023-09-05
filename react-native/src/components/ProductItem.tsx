import { StyleSheet, View, Text } from "react-native";
import { Inventory } from "../store/inventory";

export default ({ record: { item } }: { record: { item: Inventory } }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.fields["Product Name"]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%"
  },
  text: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "900",
    color: "#1B2633"
  }
});
