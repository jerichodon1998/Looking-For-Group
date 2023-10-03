import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./nonAuthenticatedStack/StackNavigator";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { persistAuth } from "../redux/features/authentication/authenticationSlice";
import AuthDrawerNavigator from "./authenticatedStack/AuthDrawerNavigator";

const AppNavigation: React.FC = () => {
	const userAuth = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(persistAuth(user));
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<NavigationContainer>
			{/* Render different navigation stack for auth users and non-auth users */}
			{userAuth.isLoggedIn ? <AuthDrawerNavigator /> : <StackNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigation;
