import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Searchbar, Avatar, Button } from 'react-native-paper';
import StockTable from './StockTable';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending']);

const Tab = createMaterialTopTabNavigator();
const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBarHeight,
		backgroundColor: 'white',
	},
	header: {
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBox: {
		margin: 10,
		marginBottom: 2,
		flex: 1,
		height: 40,
	},
	loginButton: {
		marginRight: 10,
	}
})

const Home = () => {
	const navigation = useNavigation();
	const [serachQuery, setSearchQuery] = useState('');

	const { data: userEmail } = useQuery(
		['userEmail'],
		() => {
			if(userEmail !== undefined) {
				return userEmail
			}
			return null;
		},
		{
			initalData: false,
			staleTime: Infinity,
		});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Searchbar
					placeholder='주식명 검색'
					value={serachQuery}
					onChangeText={serachQuery => setSearchQuery(serachQuery)}
					style={styles.inputBox}
					onIconPress={() => {
						console.log("hi");
					}}
				/>
				{userEmail ?
					<Avatar.Text
						style={{ ...styles.loginButton, backgroundColor: 'black' }}
						label={userEmail[0].toUpperCase()}
						color="white"
						size={50}
					/> :
					<Button
						compact={true}
						style={{ ...styles.loginButton }}
						color='black'
						onPress={() => navigation.navigate('Login')}
					>로그인</Button>
				}
			</View>
			<Tab.Navigator
				screenOptions={{
					tabBarItemStyle: { width: 90 },
					tabBarIndicatorStyle: { backgroundColor: 'red' },
				}}
			>
				<Tab.Screen name="전체" component={StockTable} />
				<Tab.Screen name="KOSPI" component={StockTable} />
				<Tab.Screen name="KOSDAQ" component={StockTable} />
				{/* <Tab.Screen name="관심" component={StockTable} /> */}
			</Tab.Navigator>
		</View>
	);
};

export default Home;