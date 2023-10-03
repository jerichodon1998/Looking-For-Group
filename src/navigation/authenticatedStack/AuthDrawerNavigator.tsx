import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthStackNavigator from "./AuthStackNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Button } from "react-native";
import { userLogout } from "../../redux/features/authentication/authenticationSlice";

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
				name={auth?.userData?.email || "Lookn-4-G"}
				component={AuthStackNavigator}
			/>
			<Drawer.Screen name="Settings" component={SettingsScreen} />
			<Drawer.Screen name="Logout" component={LogoutComponent} />
		</Drawer.Navigator>
	);
};

export default AuthDrawerNavigator;
