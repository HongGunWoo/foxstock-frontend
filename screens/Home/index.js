import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Searchbar, Avatar, Button } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LogBox } from 'react-native';

import InterestTable from './InterestTable';
import StockTable from './StockTable';

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
		marginTop: 5,
	},
})

const Home = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');

	const { data: userEmail } = useQuery(
		['userEmail'],
		() => {
			if (userEmail !== undefined) {
				return userEmail
			}
			return null;
		},
		{
			initalData: false,
			staleTime: Infinity,
		});

	return (
			<TouchableWithoutFeedback onPress={Platform.OS === 'web' ? null : Keyboard.dismiss}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Searchbar
							placeholder='주식명 검색'
							value={searchQuery}
							onChangeText={serachQuery => setSearchQuery(serachQuery)}
							style={styles.inputBox}
							onIconPress={() => {
								if (searchQuery.length > 0) {
									navigation.navigate('SearchPage', { query: searchQuery })
									setSearchQuery('');
								}
							}}
							onSubmitEditing={() => {
								if (searchQuery.length > 0) {
									navigation.navigate('SearchPage', { query: searchQuery })
									setSearchQuery('');
								}
							}}
						/>
						{userEmail ?
							<TouchableWithoutFeedback
								onPress={() => navigation.navigate('ChangePW')}
							>
								<Avatar.Text
									style={{ ...styles.loginButton, backgroundColor: 'black' }}
									label={userEmail[0].toUpperCase()}
									color="white"
									size={40}
								/>
							</TouchableWithoutFeedback>

							:
							<Button
								compact={true}
								style={{ ...styles.loginButton }}
								color='black'
								onPress={() => navigation.navigate('Login')}
							>
								로그인
							</Button>
						}
					</View>
					<Tab.Navigator
						screenOptions={{
							tabBarItemStyle: { width: 90 },
							tabBarIndicatorStyle: { backgroundColor: '#6200ee' },
						}}
					>
						<Tab.Screen name="전체" component={StockTable} />
						<Tab.Screen name="KOSPI" component={StockTable} />
						<Tab.Screen name="KOSDAQ" component={StockTable} />
						{userEmail ? <Tab.Screen name="관심" component={InterestTable} /> : null}
					</Tab.Navigator>
				</View>
			</TouchableWithoutFeedback>
	);
};

export default Home;