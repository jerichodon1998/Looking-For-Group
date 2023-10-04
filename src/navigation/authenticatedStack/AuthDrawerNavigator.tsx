import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthStackNavigator from "./AuthStackNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Button } from "react-native";
import { userLogout } from "../../redux/features/authentication/authenticationSlice";
import { ParamListBase, RouteProp } from "@react-navigation/core";

const Drawer = createDrawerNavigator();

const AuthDrawerNavigator = (): JSX.Element => {
	const auth = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const LogoutComponent = () => {
		return (
			<Button
				title="Logout"
				onPress={() => {
					dispatch(userLogout());
				}}
			/>
		);
	};

	const renderDrawerIcons = (
		color: string,
		focused: boolean,
		size: number,
		route: RouteProp<ParamListBase, string>
	) => {
		//	render different icon style when focused
		// iconName set "newspaper" as default value to satisfy typescript annotation
		let iconName: keyof typeof Ionicons.glyphMap = "person-circle-outline";

		if (route.name === auth.userData?.email) {
			iconName = focused ? "person-circle" : "person-circle-outline";
		}
		if (route.name === "Settings") {
			iconName = focused ? "cog" : "cog-outline";
		}
		if (route.name === "Logout") {
			iconName = focused ? "exit" : "exit-outline";
		}

		return <Ionicons name={iconName} size={size} color={color} />;
	};

	return (
		<Drawer.Navigator
			screenOptions={({ navigation, route }) => ({
				headerLeft: () => (
					<Ionicons
						style={{ marginLeft: 8 }}
						name="person-circle-outline"
						size={34}
						color="black"
						onPress={navigation.toggleDrawer}
					/>
				),
				drawerIcon: ({ color, focused, size }) => {
					return renderDrawerIcons(color, focused, size, route);
				},
			})}
		>
			<Drawer.Screen
				name={auth?.userData?.email || "Lookn-4-Group"}
				component={AuthStackNavigator}
			/>
			<Drawer.Screen name="Settings" component={SettingsScreen} />
			<Drawer.Screen name="Logout" component={LogoutComponent} />
		</Drawer.Navigator>
	);
};

export default AuthDrawerNavigator;
