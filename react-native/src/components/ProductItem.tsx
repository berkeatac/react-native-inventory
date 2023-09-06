import { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Inventory } from "../store/inventory";
import { convertDateToDDMMYYYY, isNewerThanWeek } from "../utils";

const NewTag = () => {
  return (
    <View style={styles.newTagView}>
      <Image
        source={require("../assets/images/new.png")}
        style={{ width: 29, height: 10 }}
      />
    </View>
  );
};

const FieldTag = ({ text }: { text: string }) => {
  return (
    <View style={styles.fieldTagView}>
      <Text key={text} style={styles.fieldTagText} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

const ExpansionChevron = ({
  setExpanded,
  expanded
}: {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <TouchableOpacity
      onPress={() => setExpanded((expanded) => !expanded)}
      style={styles.chevronButton}
    >
      {expanded ? (
        <Image source={require("../assets/images/chevron-up.png")} />
      ) : (
        <Image source={require("../assets/images/chevron-down.png")} />
      )}
    </TouchableOpacity>
  );
};

const ProductItem = ({ record: { item } }: { record: { item: Inventory } }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    fields: {
      "Product Name": productName,
      "Product Categories": productCategories,
      "Product Image": productImage
    }
  } = item;

  const renderTags = () =>
    productCategories
      .split(", ")
      .map((category, index) => (
        <FieldTag text={category} key={`${category.toLowerCase()}-${index}`} />
      ));

  const imageSrc = productImage
    ? {
        uri: productImage,
        width: 85
      }
    : require("../assets/images/placeholder.png");

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={imageSrc}
          style={productImage ? styles.image : styles.placeholder}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.title}>{productName}</Text>
            <Text style={styles.date}>
              {convertDateToDDMMYYYY(item.createdTime)}
            </Text>
          </View>

          {isNewerThanWeek(item.createdTime) && <NewTag />}

          {productCategories && (
            <ExpansionChevron expanded={expanded} setExpanded={setExpanded} />
          )}
        </View>

        {expanded && productCategories && (
          <View style={styles.fieldTagsContainer}>{renderTags()}</View>
        )}
      </View>
    </View>
  );
};

export default ProductItem;

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
  imageView: {
    flex: 0,
    width: 85,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
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
  },
  fieldTagsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 4,
    rowGap: 6,
    marginTop: 12
  },
  fieldTagView: {
    height: 26,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: "#D4E5FF"
  },
  fieldTagText: {
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "400",
    flex: 1
  }
});
