import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import icon from '../../assets/logo.png'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2B2E4A',
	},
	title: {
		fontSize: 30,
		color: '#FFFFFF'
	},
	logo: {
		alignSelf: 'flex-start',
		height: 150,
		resizeMode: 'contain'
	}
})

const Loading = () => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={icon} />
			<Text style={styles.title}>여우의 주식 레시피</Text>
			<ActivityIndicator size='large' color='#E84545'/>
			<StatusBar style='light'/>
		</View>
	);
};


export default Loading;