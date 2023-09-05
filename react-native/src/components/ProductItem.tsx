import { StyleSheet, View, Text, Image } from "react-native";
import { Inventory } from "../store/inventory";
import { convertDateToDDMMYYYY } from "../utils";

export default ({ record: { item } }: { record: { item: Inventory } }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.fields["Product Image"], width: 85 }} />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={styles.title}>{item.fields["Product Name"]}</Text>
          <Text style={styles.date}>
            {convertDateToDDMMYYYY(item.createdTime)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flex: 1,
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: "900",
    color: "#1B2633"
  },
  date: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16
  }
});
