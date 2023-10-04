import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../screens/HomeScreen";
import NotificationsScreen from "../../screens/Notifications";
import SettingsScreen from "../../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/core";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = (): JSX.Element => {
	const renderTabBarIcons = (
		color: string,
		focused: boolean,
		route: RouteProp<ParamListBase, string>
	) => {
		//	render different icon style when focused
		// iconName set "newspaper" as default value to satisfy typescript annotation
		let iconName: keyof typeof Ionicons.glyphMap = "newspaper";

		if (route.name === "Feed") {
			iconName = focused ? "newspaper" : "newspaper-outline";
		}
		if (route.name === "Notifications") {
			iconName = focused ? "notifications" : "notifications-outline";
		}
		if (route.name === "Settings") {
			iconName = focused ? "cog" : "cog-outline";
		}

		return <Ionicons name={iconName} size={24} color={color} />;
	};

	return (
		<TopTab.Navigator
			screenOptions={({ route }) => ({
				tabBarLabelStyle: { textTransform: "capitalize" },
				tabBarIndicatorStyle: {
					height: 5,
					borderRadius: 5,
				},
				tabBarIcon: ({ focused, color }) => {
					return renderTabBarIcons(color, focused, route);
				},
			})}
		>
			<TopTab.Screen name="Feed" component={HomeScreen} />
			<TopTab.Screen name="Notifications" component={NotificationsScreen} />
			<TopTab.Screen name="Settings" component={SettingsScreen} />
		</TopTab.Navigator>
	);
};

export default TopTabNavigator;
