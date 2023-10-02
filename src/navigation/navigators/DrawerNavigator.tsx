import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = (): JSX.Element => {
	return (
		<Drawer.Navigator
			screenOptions={({ navigation }) => ({
				headerLeft: () => (
					<Ionicons
						style={{ marginLeft: 8 }}
						name="person-circle-outline"
						size={34}
						color="black"
						onPress={navigation.toggleDrawer}
					/>
				),
			})}
		>
			<Drawer.Screen
				name="Lookn-4-G"
				// options={{ headerShown: false }}
				component={StackNavigator}
			/>
			<Drawer.Screen name="Settings" component={SettingsScreen} />
			<Drawer.Screen name="Logout" component={SettingsScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
