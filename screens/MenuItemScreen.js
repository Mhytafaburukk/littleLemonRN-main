import * as React from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from "react-native";

const MenuItemScreen = () => {
    const ALL_ITEMS = [
        { id: '1', name: 'Spinach Artichoke Dip', price: '$10', category: 'Appetizers' },
        { id: '2', name: 'Hummus', price: '$10', category: 'Appetizers' },
        { id: '3', name: 'Fried Calamari Rings', price: '$5', category: 'Appetizers' },
        { id: '4', name: 'Fried Mushroom', price: '$12', category: 'Appetizers' },
        { id: '5', name: 'Greek', price: '$7', category: 'Salads' },
        { id: '6', name: 'Caesar', price: '$7', category: 'Salads' },
        { id: '7', name: 'Tuna Salad', price: '$10', category: 'Salads' },
        { id: '8', name: 'Grilled Chicken Salad', price: '$12', category: 'Salads' },
        { id: '9', name: 'Water', price: '$3', category: 'Beverages' },
        { id: '10', name: 'Coke', price: '$3', category: 'Beverages' },
        { id: '11', name: 'Beer', price: '$7', category: 'Beverages' },
        { id: '12', name: 'Iced Tea', price: '$3', category: 'Beverages' },
    ];

    const [searchText, setSearchText] = React.useState('');
    const [activeFilter, setActiveFilter] = React.useState('');
    const [menuData, setMenuData] = React.useState([]);

    const filteredData = ALL_ITEMS.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = activeFilter == '' || item.category === activeFilter;
        return searchMatch && matchesFilter;
    })


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder={"Search"}
            />
            <View style={styles.filterRow}>
                {["Appetizers", "Salads", "Beverages"].map(category => (
                    <Pressable
                        key={category}
                        style={[styles.filterBtn, activeFilter === category && styles.filterBtnActive]}
                        onPress={() => setActiveFilter(category)}
                    >
                        <Text style={styles.filterText}>{category}</Text>
                    </Pressable>
                ))}
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#3d5a4c' },
    searchInput: { backgroundColor: 'white', margin: 12, padding: 10, borderRadius: 8 },
    filterRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
    filterBtn: { backgroundColor: '#5a7a6a', padding: 8, borderRadius: 8, minWidth: 90, alignItems: 'center' },
    filterBtnActive: { backgroundColor: '#e8956d' },   // turuncu = aktif
    filterText: { color: 'white', fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#4a6a5a' },
    itemName: { color: 'white', fontSize: 16 },
    itemPrice: { color: 'white', fontSize: 16 },
});

export default MenuItemScreen;