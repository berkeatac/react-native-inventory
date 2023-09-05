import { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Inventory } from "../store/inventory";
import { convertDateToDDMMYYYY, isNewerThanWeek } from "../utils";

const NewTag = () => {
  return (
    <View style={styles.newTagView}>
      <Image
        source={require("../assets/new.png")}
        style={{ width: 29, height: 10 }}
      />
    </View>
  );
};

export default ({ record: { item } }: { record: { item: Inventory } }) => {
  const [expanded, setExpanded] = useState(false);

  const productImage = item.fields["Product Image"]
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
          width: 85,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20
        }}
      >
        <Image
          source={productImage}
          style={
            item.fields["Product Image"] ? styles.image : styles.placeholder
          }
        />
      </View>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.title}>{item.fields["Product Name"]}</Text>
            <Text style={styles.date}>
              {convertDateToDDMMYYYY(item.createdTime)}
            </Text>
          </View>
          {isNewerThanWeek(item.createdTime) && <NewTag />}
          <TouchableOpacity
            onPress={() => setExpanded((expanded) => !expanded)}
            style={styles.chevronButton}
          >
            {expanded ? (
              <Image source={require("../assets/chevron-up.png")} />
            ) : (
              <Image source={require("../assets/chevron-down.png")} />
            )}
          </TouchableOpacity>
        </View>
        {expanded && item.fields["Product Categories"] && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              columnGap: 4,
              rowGap: 6,
              marginTop: 12
            }}
          >
            {item.fields["Product Categories"].split(", ").map((category) => (
              <View
                style={{
                  height: 26,
                  borderRadius: 48,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  backgroundColor: "#D4E5FF"
                }}
                key={category.toLowerCase().trim()}
              >
                <Text
                  key={category}
                  style={{
                    fontSize: 12,
                    lineHeight: 22,
                    fontWeight: "400",
                    flex: 1
                  }}
                  numberOfLines={1}
                >
                  {category}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
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
    lineHeight: 18,
    marginTop: 2
  },
  chevronButton: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    width: 40,
    height: 40
  },
  newTagView: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 26,
    borderRadius: 9,
    padding: 8,
    borderTopRightRadius: 0,
    backgroundColor: "#333333",
    marginRight: 8
  }
});
