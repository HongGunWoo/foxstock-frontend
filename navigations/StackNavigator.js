import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';


const HomeTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStackScreen = () => {
	return (
		<HomeTab.Navigator
			initialRouteName='Home'
			barStyle={{
				backgroundColor: 'black',
				// paddingBottom: 10
			}}
		>
			<HomeTab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: () => (<MaterialCommunityIcons name="finance" color='white' size={25} />),
				}}
			/>
			<HomeTab.Screen
				name="Guide"
				component={Home}
				options={{
					tabBarIcon: () => (<MaterialCommunityIcons name="book-open-outline" color='white' size={25} />),
				}}
			/>
		</HomeTab.Navigator>
	)
}

const StackNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='HomeStackScreen'
			>
				<Stack.Screen
					name='HomeStackScreen'
					component={HomeStackScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ title: '로그인' }}
				/>
				<Stack.Screen
					name='SignUp'
					component={SignUp}
					options={{ title: '회원가입' }}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default StackNavigator;