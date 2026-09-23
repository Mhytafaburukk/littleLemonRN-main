import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import MenuItemScreen from "./screens/MenuItemScreen";

export default function App() {
  return (
    <NavigationContainer>
      <MenuItemScreen />
    </NavigationContainer>
  );
}
