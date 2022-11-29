import React, { useEffect, useState } from 'react';
import { TextInput, Button, Headline } from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import getEnvVars from '../../environment';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { apiUrl } = getEnvVars();
const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

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
	header: {
		backgroundColor: 'transparent',
		border: 0,
		marginTop: 0
	},
	inputBox: {
		backgroundColor: 'transparent',
		marginBottom: 20,
	},
	loginButton: {
		marginBottom: 10,
		borderRadius: 20,
		padding: 5,
	},
	findButton: {
		marginBottom: 10,
		borderRadius: 20,
		height: 50,
		color: 'black',
	}
})

const Login = () => {
	const navigation = useNavigation();
	const queryClient = useQueryClient();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkLoginSuccess, setCheckLoginSuccess] = useState(false);

	const { mutate, data } = useMutation(
		['signIn'],
		async (userInfo) => {
			const url = `${apiUrl}/login`;
			return await axios
				.post(url, userInfo)
				.then((res) => setCheckLoginSuccess(res.data))
				
		}
	)

	useEffect(() => {
		if (checkLoginSuccess) {
			queryClient.setQueriesData(['userEmail'], email)
			navigation.navigate('HomeStackScreen');
		}
	}, [checkLoginSuccess])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1 }}
			keyboardVerticalOffset={StatusBarHeight + 44}
		>
			<ScrollView style={{ backgroundColor: 'white' }}>
				<TouchableWithoutFeedback onPress={Platform.OS === 'web' ? null : Keyboard.dismiss}>
					<View style={styles.container}>
						<Headline style={styles.headline}>여우의</Headline>
						<Headline style={{ ...styles.headline, marginBottom: 10 }}>주식 레시피</Headline>
						<TextInput
							style={styles.inputBox}
							left={<TextInput.Icon name="account" />}
							placeholder='Email'
							// activeUnderlineColor={}
							keyboardType='email-address'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<TextInput
							style={styles.inputBox}
							left={<TextInput.Icon name="lock" />}
							placeholder='Password'
							// activeUnderlineColor={}
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry
						/>
						<Button
							style={styles.loginButton}
							mode='contained'
							onPress={() => mutate({
								"email": email,
								"password": password,
							})}
						>로그인</Button>
						<Button
							style={styles.loginButton}
							mode='contained'
							onPress={() => navigation.navigate('SignUp')}
						>
							회원가입
						</Button>
						<Button
							style={styles.findButton}
							mode='text'
							onPress={() => navigation.navigate('FindUserInfo')}
						>
							아이디/비밀번호 찾기
						</Button>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>

	);
};

export default Login;