import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const fn = await AsyncStorage.getItem("firstName");
      const ln = await AsyncStorage.getItem("lastName");
      const em = await AsyncStorage.getItem("email");
      const ph = await AsyncStorage.getItem("phone");
      if (fn) setFirstName(fn);
      if (ln) setLastName(ln);
      if (em) setEmail(em);
      if (ph) setPhone(ph);
    } catch (e) {
      console.error(e);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem("firstName", firstName.trim());
      await AsyncStorage.setItem("lastName", lastName.trim());
      await AsyncStorage.setItem("email", email.trim());
      await AsyncStorage.setItem("phone", phone.trim());
      Alert.alert("Success", "Profile saved successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
          <Image
            style={styles.logo}
            source={require("../assets/little-lemon-logo.png")}
            accessible={true}
          />
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {firstName ? firstName[0].toUpperCase() : "?"}
            </Text>
          </View>
        </View>

        {/* Profile Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Personal information</Text>

          {/* Avatar */}
          <Text style={styles.label}>Avatar</Text>
          <View style={styles.avatarRow}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>
                {firstName ? firstName[0].toUpperCase() : "?"}
              </Text>
            </View>
            <Pressable style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Change</Text>
            </Pressable>
            <Pressable style={styles.removeBtn}>
              <Text style={styles.removeBtnText}>Remove</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="(217) 555-0113"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
          />
        </View>

        {/* Logout */}
        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        {/* Save/Discard */}
        <View style={styles.actionRow}>
          <Pressable style={styles.discardBtn} onPress={loadProfile}>
            <Text style={styles.discardText}>Discard changes</Text>
          </Pressable>
          <Pressable style={styles.saveBtn} onPress={saveProfile}>
            <Text style={styles.saveText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, backgroundColor: "#fff", paddingBottom: 30 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#495E57",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  logo: { height: 50, width: 140, resizeMode: "contain" },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#495E57",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#F4CE14", fontSize: 18, fontWeight: "bold" },

  content: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#333", marginBottom: 20 },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#777",
    marginBottom: 6,
    marginTop: 14,
  },

  // Avatar Row
  avatarRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#495E57",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLargeText: { color: "#F4CE14", fontSize: 30, fontWeight: "bold" },
  changeBtn: {
    backgroundColor: "#495E57",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeBtnText: { color: "#fff", fontWeight: "600" },
  removeBtn: {
    borderWidth: 1.5,
    borderColor: "#495E57",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeBtnText: { color: "#495E57", fontWeight: "600" },

  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },

  // Logout
  logoutBtn: {
    backgroundColor: "#F4CE14",
    marginHorizontal: 20,
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { fontSize: 17, fontWeight: "700", color: "#333" },

  // Action Row
  actionRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  discardBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#495E57",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  discardText: { color: "#495E57", fontWeight: "600", fontSize: 15 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#495E57",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});

export default ProfileScreen;
