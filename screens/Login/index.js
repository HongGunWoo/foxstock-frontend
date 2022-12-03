import React, { useEffect, useState } from 'react';
import { TextInput, Button, Headline, HelperText } from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, Platform, StatusBar, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import getEnvVars from '../../environment';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import UserButton from '../../components/UserButton';

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
	inputBox: {
		backgroundColor: 'transparent',
		marginBottom: 20,
	},
	findButton: {
		marginBottom: 10,
		borderRadius: 20,
		height: 50,
		color: 'black',
	},
	helperText: {
		marginTop: 0,
		marginLeft: 20
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

	const hasEmailError = () => {
		var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return !reg.test(email);
  };

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
							style={{...styles.inputBox, marginBottom: 0}}
							left={<TextInput.Icon name="account" />}
							placeholder='Email'
							keyboardType='email-address'
							label="Email"
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<HelperText style={styles.helperText} type='error' visible={hasEmailError() && email !== ''}>
							이메일주소가 올바르지 않습니다.
						</HelperText>
						<TextInput
							style={styles.inputBox}
							left={<TextInput.Icon name="lock" />}
							placeholder='Password'
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry
						/>

						<UserButton
							disabled = {hasEmailError() || email === '' || password === ''}
							onPress={() => mutate({
								"email": email,
								"password": password,
							})}
						>
							로그인
						</UserButton>
						<UserButton
							onPress={() => navigation.navigate('SignUp')}
						>
							회원가입
						</UserButton>
						<Button
							style={styles.findButton}
							mode='text'
							onPress={() => navigation.navigate('FindUserInfo')}
							color='#660099'
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