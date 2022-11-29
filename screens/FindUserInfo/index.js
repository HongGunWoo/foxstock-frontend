import React, { useEffect } from 'react';
import { Button, Headline } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
	headline: {
		fontSize: 30,
		marginStart: 10
	},
	button: {
		marginBottom: 40,
		borderRadius: 20,
		padding: 5,
	},
})

const FindUserInfo = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Headline style={styles.headline}>나의</Headline>
			<Headline style={styles.headline}>주식 레시피를</Headline>
			<Headline style={{ ...styles.headline, marginBottom: 40 }}>찾아볼까요?</Headline>
			<Button
				style={styles.button}
				mode='contained'
				onPress={() => navigation.navigate('FindID')}
			>
				아이디 찾기
			</Button>
			<Button
				style={styles.button}
				mode='contained'
				onPress={() => navigation.navigate('FindPW')}
			>
				비밀번호 찾기
			</Button>
		</View>
	);
};

export default FindUserInfo;