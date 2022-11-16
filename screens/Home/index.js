import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Searchbar, Text, IconButton, Avatar, Button } from 'react-native-paper';
import Loading from '../Loading';
import StockTable from './StockTable';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	header: {
		flexDirection: 'row',
		backgroundColor: 'white',
		// border: 0,
		// marginTop: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBox: {
		margin: 10,
		// marginBottom: 0,
		flex: 1,
	},
	loginButton: {
		// margin: 15,
		marginRight: 10,
	}
})

const Home = () => {
	const navigation = useNavigation();
	const [serachQuery, setSearchQuery] = useState('');
	const { data: userEmail } = useQuery(['userEmail'], {
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
				/>
				{userEmail ?
					<Avatar.Text
						style={{ ...styles.loginButton, backgroundColor: 'black' }}
						label={userEmail[0]}
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