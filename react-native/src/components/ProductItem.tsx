import { StyleSheet, View, Text, Image } from "react-native";
import { Inventory } from "../store/inventory";
import { convertDateToDDMMYYYY } from "../utils";

export default ({ record: { item } }: { record: { item: Inventory } }) => {
  const image = item.fields["Product Image"]
    ? {
        uri: item.fields["Product Image"],
        width: 85
      }
    : require("../assets/placeholder.png");

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0,
          flexDirection: "column",
          width: 85,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20
        }}
      >
        <Image
          source={image}
          style={
            item.fields["Product Image"] ? styles.image : styles.placeholder
          }
        />
      </View>
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
    flexDirection: "row",
    padding: 8,
    shadowColor: "#1B2633",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    backgroundColor: "#F8F9FC",
    marginHorizontal: 16,
    borderRadius: 4
  },
  image: {
    width: 85,
    height: "100%",
    resizeMode: "contain"
  },
  placeholder: {
    width: 48,
    height: 48,
    resizeMode: "contain"
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
