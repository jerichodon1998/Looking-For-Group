import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../screens/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationsScreen from "../../screens/Notifications";
import SettingsScreen from "../../screens/SettingsScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = (): JSX.Element => {
	return (
		<TopTab.Navigator
			screenOptions={{
				tabBarLabelStyle: { textTransform: "capitalize" },
				tabBarIndicatorStyle: {
					height: 5,
					borderRadius: 5,
				},
			}}
		>
			<TopTab.Screen name="Feed" component={HomeScreen} />
			<TopTab.Screen name="Login or Signup" component={BottomTabNavigator} />
			<TopTab.Screen name="Notifications" component={NotificationsScreen} />
			<TopTab.Screen name="Settings" component={SettingsScreen} />
		</TopTab.Navigator>
	);
};

export default TopTabNavigator;
