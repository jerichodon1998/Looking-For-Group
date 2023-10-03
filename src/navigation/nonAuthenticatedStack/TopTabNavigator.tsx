import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../../screens/HomeScreen";
import BottomTabNavigator from "./BottomTabNavigator";

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
		</TopTab.Navigator>
	);
};

export default TopTabNavigator;
