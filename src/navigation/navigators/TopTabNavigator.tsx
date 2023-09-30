import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../screens/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationsScreen from "../../screens/Notifications";
import SettingsScreen from "../../screens/SettingsScreen";
import { useAppSelector } from "../../redux/app/hooks";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = (): JSX.Element => {
	const authStore = useAppSelector((state) => state.auth);

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
			{authStore.isLoggedIn ? (
				<>
					<TopTab.Screen name="Notifications" component={NotificationsScreen} />
					<TopTab.Screen name="Settings" component={SettingsScreen} />
					<TopTab.Screen name="Logout" component={SettingsScreen} />
				</>
			) : (
				<TopTab.Screen name="Login or Signup" component={BottomTabNavigator} />
			)}
		</TopTab.Navigator>
	);
};

export default TopTabNavigator;
