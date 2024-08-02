import React, { useState, useRef } from "react";
import { SafeAreaView, Animated } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Check, ChevronDown, Search } from "react-native-feather";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => {
    if (open) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(dropdownHeight, {
        toValue: 200, // Adjust this value based on your content height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
          <Text style={styles.buttonText}>
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
          </Text>
          <ChevronDown width={20} height={20} />
        </TouchableOpacity>

        {open && (
          <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
            <View style={styles.searchContainer}>
              <Search
                width={20}
                height={20}
                color="black"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search framework..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
              />
            </View>
            <FlatList
              data={filteredFrameworks}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setValue(item.value);
                    toggleDropdown();
                  }}
                >
                  <Check
                    width={20}
                    height={20}
                    style={{ opacity: value === item.value ? 1 : 0 }}
                  />
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No framework found.</Text>
              }
            />
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 420, // Adjust this value based on your layout
    width: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 1000, // Ensure the dropdown appears above other elements
    overflow: "hidden",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});
