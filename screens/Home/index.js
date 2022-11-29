import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, Avatar, Button, Provider, Portal, FAB, Text } from 'react-native-paper';
import StockTable from './StockTable';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { LogBox } from 'react-native';
import axios from 'axios';
import getEnvVars from '../../environment';
import InterestTable from './InterestTable';
LogBox.ignoreLogs(['Sending']);

const { apiUrl } = getEnvVars();
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
	userButton: {
		// borderRadius: 100,
		backgroundColor: 'black',
		color: 'white'
	}
})

const Home = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');

	const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

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
		<View style={styles.container}>
			<View style={styles.header}>
				<Searchbar
					placeholder='주식명 검색'
					value={searchQuery}
					onChangeText={serachQuery => setSearchQuery(serachQuery)}
					style={styles.inputBox}
				onIconPress={() => {
					navigation.navigate('SearchPage', {query: searchQuery})
					setSearchQuery('');
				}}
				onSubmitEditing={() => {
					navigation.navigate('SearchPage', {query: searchQuery})
					setSearchQuery('');
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
				<Tab.Screen name="관심" component={InterestTable} />
			</Tab.Navigator>
		</View>
	);
};

export default Home;