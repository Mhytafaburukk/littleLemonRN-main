import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MENU_ITEMS = [
  {
    id: "1",
    name: "Greek Salad",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago...",
    price: "$12.99",
    category: "Starters",
    image: require("../assets/icon.png"),
  },
  {
    id: "2",
    name: "Bruschetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garli...",
    price: "$7.99",
    category: "Starters",
    image: require("../assets/icon.png"),
  },
  {
    id: "3",
    name: "Grilled Fish",
    description:
      "Barbequed catch of the day. with red onion, crisp capers, chive creme fraiche,",
    price: "$20.00",
    category: "Mains",
    image: require("../assets/icon.png"),
  },
  {
    id: "4",
    name: "Pasta",
    description:
      "Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & Parmesan",
    price: "$18.00",
    category: "Mains",
    image: require("../assets/icon.png"),
  },
  {
    id: "5",
    name: "Lemon Dessert",
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been...",
    price: "$10.00",
    category: "Desserts",
    image: require("../assets/icon.png"),
  },
  {
    id: "6",
    name: "Ice Cream",
    description:
      "Creamy homemade ice cream with fresh seasonal fruit and a drizzle of honey",
    price: "$8.00",
    category: "Desserts",
    image: require("../assets/icon.png"),
  },
  {
    id: "7",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemon juice with mint and sparkling water",
    price: "$4.50",
    category: "Drinks",
    image: require("../assets/icon.png"),
  },
  {
    id: "8",
    name: "House Wine",
    description: "Selection of red and white wines from the Mediterranean region",
    price: "$9.00",
    category: "Drinks",
    image: require("../assets/icon.png"),
  },
];

const CATEGORIES = ["Starters", "Mains", "Desserts", "Drinks"];

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("");
  const [firstName, setFirstName] = React.useState("");

  React.useEffect(() => {
    const loadName = async () => {
      try {
        const name = await AsyncStorage.getItem("firstName");
        if (name) setFirstName(name);
      } catch (e) {
        console.error(e);
      }
    };
    loadName();
  }, []);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchCategory =
      activeCategory === "" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      <Image style={styles.menuItemImage} source={item.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/little-lemon-logo.png")}
          accessible={true}
          accessibilityLabel="Little Lemon Logo"
        />
        <Pressable
          style={styles.avatarBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {firstName ? firstName[0].toUpperCase() : "?"}
            </Text>
          </View>
        </Pressable>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <>
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={styles.heroContent}>
                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>Little Lemon</Text>
                  <Text style={styles.heroSubtitle}>Chicago</Text>
                  <Text style={styles.heroDescription}>
                    We are a family owned Mediterranean restaurant, focused on
                    traditional recipes served with a modern twist.
                  </Text>
                </View>
                <Image
                  style={styles.heroImage}
                  source={require("../assets/icon.png")}
                />
              </View>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search menu"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            {/* Menu Breakdown */}
            <View style={styles.breakdownContainer}>
              <Text style={styles.breakdownTitle}>ORDER FOR DELIVERY!</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryRow}
              >
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryBtn,
                      activeCategory === cat && styles.categoryBtnActive,
                    ]}
                    onPress={() =>
                      setActiveCategory(activeCategory === cat ? "" : cat)
                    }
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        activeCategory === cat && styles.categoryTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <View style={styles.divider} />
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: { height: 50, width: 160, resizeMode: "contain" },
  avatarBtn: { padding: 4 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#495E57",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#F4CE14", fontSize: 18, fontWeight: "bold" },

  // Hero
  hero: {
    backgroundColor: "#495E57",
    padding: 20,
  },
  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroText: { flex: 1, paddingRight: 12 },
  heroTitle: { color: "#F4CE14", fontSize: 34, fontWeight: "bold" },
  heroSubtitle: { color: "#fff", fontSize: 20, fontWeight: "600", marginBottom: 8 },
  heroDescription: { color: "#fff", fontSize: 14, lineHeight: 20 },
  heroImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    resizeMode: "cover",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },

  // Breakdown
  breakdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    marginBottom: 14,
  },
  categoryRow: { flexDirection: "row", gap: 10, paddingBottom: 12 },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e8e8e8",
  },
  categoryBtnActive: { backgroundColor: "#F4CE14" },
  categoryText: { fontSize: 14, fontWeight: "600", color: "#555" },
  categoryTextActive: { color: "#333" },
  divider: { height: 1, backgroundColor: "#ddd", marginTop: 4 },

  // Menu Items
  menuItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  menuItemInfo: { flex: 1, paddingRight: 12 },
  menuItemName: { fontSize: 17, fontWeight: "bold", color: "#333", marginBottom: 4 },
  menuItemDesc: { fontSize: 13, color: "#777", lineHeight: 18, marginBottom: 8 },
  menuItemPrice: { fontSize: 15, fontWeight: "600", color: "#495E57" },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  separator: { height: 1, backgroundColor: "#eee", marginHorizontal: 16 },
});

export default HomeScreen;
