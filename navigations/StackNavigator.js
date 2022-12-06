import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Guide from '../screens/Guide';
import FindUserInfo from '../screens/FindUserInfo';
import FindPW from '../screens/FindUserInfo/FindPW';
import FindID from '../screens/FindUserInfo/FindID';
import ChangePW from '../screens/ChangePW';
import SearchPage from '../screens/SearchPage';

const HomeTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackScreen = () => {
	return (
		<HomeTab.Navigator
			initialRouteName='Home'
			barStyle={{
				backgroundColor: '#660099',
			}}
		>
			<HomeTab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({color}) => (<MaterialCommunityIcons name="finance" color={color} size={25} />),
				}}
			/>
			<HomeTab.Screen
				name="Guide"
				component={Guide}
				options={{
					tabBarIcon: ({color}) => (<MaterialCommunityIcons name="book-open-outline" color={color} size={25} />),
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
					options={{ title: '로그인'}}
				/>
				<Stack.Screen
					name='SignUp'
					component={SignUp}
					options={{ title: '회원가입' }}
				/>
				<Stack.Screen 
					name='FindUserInfo'
					component={FindUserInfo}
					options={{ title: 'ID/PW 찾기' }}
				/>
				<Stack.Screen 
					name='FindPW'
					component={FindPW}
					options={{ title: 'PW 찾기' }}
				/>
				<Stack.Screen 
					name='FindID'
					component={FindID}
					options={{ title: 'ID 찾기' }}
				/>
				<Stack.Screen 
					name="ChangePW"
					component={ChangePW}
					onption={{ title: 'PW 변경' }}
				/>
				<Stack.Screen
					name='SearchPage'
					component={SearchPage}
					options={{ title: '검색 결과' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default StackNavigator;