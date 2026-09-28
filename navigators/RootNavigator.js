import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [onboardingDone, setOnboardingDone] = React.useState(false);

  React.useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const done = await AsyncStorage.getItem("onboardingDone");
        setOnboardingDone(done === "true");
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading) return null;

  return (
    <Stack.Navigator
      initialRouteName={onboardingDone ? "Home" : "Onboarding"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
