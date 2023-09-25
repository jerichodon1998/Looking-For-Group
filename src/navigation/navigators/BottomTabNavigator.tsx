import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
	return (
		<BottomTab.Navigator
			screenOptions={({ route }) => ({
				// tab bar icons
				tabBarIcon: ({ focused, color }) => {
					//	render different icon style when focused
					// iconName set "enter" as default value to satisfy typescript annotation
					let iconName: keyof typeof Ionicons.glyphMap = "enter";

					if (route.name === "Login") {
						iconName = focused ? "enter" : "enter-outline";
					}
					if (route.name === "Register") {
						iconName = focused ? "create" : "create-outline";
					}

					return <Ionicons name={iconName} size={28} color={color} />;
				},
				tabBarLabelStyle: { fontSize: 14 },
				headerShown: false,
			})}
		>
			{/* bottom tab screens */}
			<BottomTab.Screen name="LoginScreen" component={LoginScreen} />
			<BottomTab.Screen name="RegisterScreen" component={RegisterScreen} />
		</BottomTab.Navigator>
	);
};

export default BottomTabNavigator;
