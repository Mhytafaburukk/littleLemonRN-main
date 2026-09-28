import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const isValid = firstName.trim().length > 0 && email.trim().length > 0;

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem("firstName", firstName.trim());
      await AsyncStorage.setItem("lastName", lastName.trim());
      await AsyncStorage.setItem("email", email.trim());
      await AsyncStorage.setItem("onboardingDone", "true");
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/little-lemon-logo.png")}
            accessible={true}
            accessibilityLabel="Little Lemon Logo"
          />
        </View>

        {/* Hero Banner */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroDescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Let us get to know you</Text>

          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Pressable
          style={[styles.nextBtn, !isValid && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: {
    height: 60,
    width: 200,
    resizeMode: "contain",
  },
  hero: {
    backgroundColor: "#495E57",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heroTitle: {
    color: "#F4CE14",
    fontSize: 36,
    fontWeight: "bold",
  },
  heroSubtitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  heroDescription: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#495E57",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
    marginBottom: 4,
  },
  nextBtn: {
    backgroundColor: "#F4CE14",
    marginHorizontal: 24,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  nextBtnDisabled: {
    backgroundColor: "#e0e0e0",
  },
  nextBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
});

export default OnboardingScreen;
