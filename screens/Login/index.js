import React, { useEffect, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const styles = StyleSheet.create({
	title: {
		alignSelf: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	header: {
		backgroundColor: 'transparent',
		border: 0,
		marginTop: 0
	},
	inputBox: {
		marginHorizontal: 50,
		backgroundColor: 'transparent',
		marginBottom: 20,
	},
	loginButton: {
		marginHorizontal: 50,
		marginBottom: 10,
		borderRadius: 20,
		padding: 5,
	},
	findButton: {
		marginHorizontal: 40,
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
	const [checkLogin, setCheckLogin] = useState(false);

	const loginUser = async (userInfo) => {
		const url = 'http://ykh8746.iptime.org:8080/login';
		return await axios
			.post(url, userInfo)
			.then((res) => setCheckLogin(res.data));
	}

	const { mutate, data } = useMutation(
		['signIn'],
		async (userInfo) => {
			const url = 'http://ykh8746.iptime.org:8080/login';
			return await axios
				.post(url, userInfo)
				.then((res) => setCheckLogin(res.data));
		},
	)

	useEffect(() => {
		if (checkLogin) {
			queryClient.setQueryData(['userEmail'], email)
			navigation.navigate('HomeStackScreen');
		}
	}, [checkLogin])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>여우의 주식 레시피</Text>
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
			<Button style={styles.findButton} mode='text'>아이디/비밀번호 찾기</Button>
			<StatusBar style='light' />
		</View>
	);
};

export default Login;